using ClientWinForm.Services;
using ClientWinForm.Models;
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace ClientWinForm
{
    public partial class ListePost : UserControl
    {
        private readonly PostService _postService;
        private int currentPage = 1;
        private int totalPages = 1;
        private const int pageSize = 10;
        private string _authToken;

        public ListePost()
        {
            InitializeComponent();
        }

        public ListePost(string token)
        {
            _authToken = token;
            _postService = new PostService(token);
            InitializeComponent();

            // Ajouter un gestionnaire pour l'événement CellClick
            dataGridViewPosts.CellClick += dataGridViewPosts_CellClick;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (currentPage > 1)
            {
                currentPage--;
                LoadPosts(currentPage);
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            if (currentPage < totalPages)
            {
                currentPage++;
                LoadPosts(currentPage);
            }
        }

        private void ListePost_Load(object sender, EventArgs e)
        {
            if (!DesignMode)
            {
                LoadPosts(currentPage);
            }
        }

        private async void LoadPosts(int page)
        {
            string dateDebut = dtpDateDebut.Value.ToString("yyyy-MM-dd");
            string dateFin = dtpDateFin.Value.ToString("yyyy-MM-dd");
            string nomUtilisateur = txtUtilisateur.Text;
            string texte = txtTitre.Text;
            string nomObjet = "";
            string categorieObjet = cboCategorie.SelectedItem?.ToString();
            int status = 0;
            string sortByDate = "DESC";

            var postsResponse = await _postService.GetPostsAsync(dateDebut, dateFin, nomUtilisateur, texte, nomObjet, categorieObjet, status, sortByDate, page, pageSize);

            if (postsResponse != null)
            {
                var posts = postsResponse["data"].ToObject<List<Post>>();
                dataGridViewPosts.DataSource = posts;

                if (!dataGridViewPosts.Columns.Contains("poste_id"))
                {
                    DataGridViewTextBoxColumn idColumn = new DataGridViewTextBoxColumn();
                    idColumn.Name = "poste_id";
                    idColumn.DataPropertyName = "PosteId";  // Utilisez "PosteId" car c'est ainsi que la propriété est nommée dans votre classe Post
                    idColumn.HeaderText = "ID du Poste";
                    dataGridViewPosts.Columns.Add(idColumn);
                }

                // Ajout de la colonne de suppression si elle n'existe pas déjà
                if (!dataGridViewPosts.Columns.Contains("btnDelete"))
                {
                    DataGridViewButtonColumn btnDelete = new DataGridViewButtonColumn();
                    btnDelete.HeaderText = "Supprimer";
                    btnDelete.Name = "btnDelete";
                    btnDelete.Text = "Supprimer";
                    btnDelete.UseColumnTextForButtonValue = true;
                    dataGridViewPosts.Columns.Add(btnDelete);
                }

                // Ajout de la colonne Voir Détails si elle n'existe pas déjà
                if (!dataGridViewPosts.Columns.Contains("btnDetails"))
                {
                    DataGridViewButtonColumn btnDetails = new DataGridViewButtonColumn();
                    btnDetails.HeaderText = "Voir Détails";
                    btnDetails.Name = "btnDetails";
                    btnDetails.Text = "Détails";
                    btnDetails.UseColumnTextForButtonValue = true;
                    dataGridViewPosts.Columns.Add(btnDetails);
                }

                if (!dataGridViewPosts.Columns.Contains("Utilisateur"))
                {
                    DataGridViewTextBoxColumn userColumn = new DataGridViewTextBoxColumn();
                    userColumn.Name = "Utilisateur";
                    userColumn.DataPropertyName = "Utilisateur.Username";  // Liaison correcte avec "Utilisateur.Username"
                    userColumn.HeaderText = "Nom d'utilisateur";
                    dataGridViewPosts.Columns.Add(userColumn);
                }

                int totalResults = postsResponse["total"].ToObject<int>();
                totalPages = postsResponse["totalPages"].ToObject<int>();

                lblResultCount.Text = $"{totalResults} résultats";
                lblPageNumber.Text = $"{currentPage}/{totalPages}";
                btnPrecedent.Enabled = currentPage > 1;
                btnSuivant.Enabled = currentPage < totalPages;
            }
            else
            {
                MessageBox.Show("Erreur lors de la récupération des données.");
            }
        }

        private async void button3_Click(object sender, EventArgs e)
        {
            currentPage = 1;
            LoadPosts(currentPage);
        }

        private void label5_Click(object sender, EventArgs e)
        {
            // Logique à exécuter lorsque label5 est cliqué
        }

        private void label6_Click(object sender, EventArgs e)
        {
            // Logique à exécuter lorsque label6 est cliqué
        }

        private void label7_Click(object sender, EventArgs e)
        {
            // Logique à exécuter lorsque label7 est cliqué
        }

        private async void dataGridViewPosts_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0)
            {
                // Gestion du bouton "Supprimer"
                if (e.ColumnIndex == dataGridViewPosts.Columns["btnDelete"].Index)
                {
                    var cell = dataGridViewPosts.Rows[e.RowIndex].Cells["poste_id"];
                    var postId = cell?.Value?.ToString();

                    if (!string.IsNullOrEmpty(postId))
                    {
                        var confirmResult = MessageBox.Show("Êtes-vous sûr de vouloir supprimer ce poste ?",
                                                             "Confirmation de suppression",
                                                             MessageBoxButtons.YesNo);

                        if (confirmResult == DialogResult.Yes)
                        {
                            var result = await _postService.DeletePostAsync(postId);

                            if (result)
                            {
                                MessageBox.Show("Poste supprimé avec succès.");
                                LoadPosts(currentPage);
                            }
                            else
                            {
                                MessageBox.Show("Erreur lors de la suppression du poste.");
                            }
                        }
                    }
                    else
                    {
                        MessageBox.Show("Erreur : L'ID du poste est introuvable.");
                    }
                }

                // Gestion du bouton "Voir Détails"
                if (e.ColumnIndex == dataGridViewPosts.Columns["btnDetails"].Index)
                {
                    var cell = dataGridViewPosts.Rows[e.RowIndex].Cells["poste_id"];
                    var postId = cell?.Value?.ToString();

                    if (!string.IsNullOrEmpty(postId))
                    {
                        // Récupérer les détails du poste
                        var postDetails = await _postService.GetPostByIdAsync(postId);

                        if (postDetails != null)
                        {
                            // Afficher le formulaire de détails
                            DetailPostForm detailForm = new DetailPostForm(postDetails, _authToken);
                            detailForm.ShowDialog();
                        }
                        else
                        {
                            MessageBox.Show("Erreur lors de la récupération des détails du poste.");
                        }
                    }
                }
            }
        }
    }
}
