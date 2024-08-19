using ClientWinForm.Models;
using ClientWinForm.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ClientWinForm
{
    public partial class DetailPostForm : Form
    {
        private readonly Post _postDetails;
        private readonly string _authToken;
        private readonly PostService _postService;

        public DetailPostForm(Post postDetails, string authToken)
        {
            _postDetails = postDetails;
            _authToken = authToken;
            _postService = new PostService(authToken);

            InitializeComponent();
            LoadPostDetails();
            LoadEchangesAsync();
        }

        private void LoadPostDetails()
        {
            // Afficher les détails du poste
            lblTitle.Text = _postDetails.Titre;
            lblDescription.Text = _postDetails.Description;
            lblUtilisateur.Text = _postDetails.Utilisateur.Username;
            lblDateCreation.Text = _postDetails.CreatedAt.ToString("dd/MM/yyyy");
            lblStatus.Text = _postDetails.Status ? "Actif" : "Inactif";
        }

        private async Task LoadEchangesAsync()
        {
            try
            {
                var echanges = await _postService.GetEchangesByPostIdAsync(_postDetails.poste_id);

                if (echanges != null)
                {
                    // Ajoutez la colonne "Proposer" si elle n'existe pas
                    if (!dataGridViewEchanges.Columns.Contains("Proposer"))
                    {
                        var proposerColumn = new DataGridViewTextBoxColumn();
                        proposerColumn.Name = "Proposer";
                        proposerColumn.HeaderText = "Proposé par";
                        dataGridViewEchanges.Columns.Add(proposerColumn);
                    }

                    // Ajoutez la colonne "Responder" si elle n'existe pas
                    if (!dataGridViewEchanges.Columns.Contains("Responder"))
                    {
                        var responderColumn = new DataGridViewTextBoxColumn();
                        responderColumn.Name = "Responder";
                        responderColumn.HeaderText = "Répondu par";
                        dataGridViewEchanges.Columns.Add(responderColumn);
                    }

                    // Ajoutez la colonne "Objet" si elle n'existe pas
                    if (!dataGridViewEchanges.Columns.Contains("Objet"))
                    {
                        var objetColumn = new DataGridViewTextBoxColumn();
                        objetColumn.Name = "Objet";
                        objetColumn.HeaderText = "Objet échangé";
                        dataGridViewEchanges.Columns.Add(objetColumn);
                    }

                    // Configurez les DataPropertyNames après avoir ajouté les colonnes
                    dataGridViewEchanges.Columns["Proposer"].DataPropertyName = "Proposer.Username";
                    dataGridViewEchanges.Columns["Responder"].DataPropertyName = "Responder.Username";
                    dataGridViewEchanges.Columns["Objet"].DataPropertyName = "EchangeDetails[0].Objet.Name";

                    dataGridViewEchanges.DataSource = echanges;
                }
                else
                {
                    MessageBox.Show("Aucun échange trouvé pour ce poste.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur lors du chargement des échanges: {ex.Message}");
            }
        }


    }
}
