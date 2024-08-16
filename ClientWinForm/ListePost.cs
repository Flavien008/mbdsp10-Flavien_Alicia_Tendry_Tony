using ClientWinForm.Services;
using ClientWinForm.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void label7_Click(object sender, EventArgs e)
        {

        }

        private void label5_Click(object sender, EventArgs e)
        {

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
                dataGridViewPosts.Columns["Utilisateur"].DataPropertyName = "Utilisateur.Username";

                int totalResults = postsResponse["total"].ToObject<int>();
                totalPages = postsResponse["totalPages"].ToObject<int>(); ;

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
    }
}
