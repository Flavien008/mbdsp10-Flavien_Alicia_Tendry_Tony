using ClientWinForm.Models;
using ClientWinForm.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Linq;


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
                    // Nettoyez les colonnes avant de les ajouter à nouveau pour éviter les doublons
                    dataGridViewEchanges.Columns.Clear();

                    // Ajoutez les colonnes sans afficher les IDs
                    var proposerColumn = new DataGridViewTextBoxColumn
                    {
                        Name = "Proposer",
                        HeaderText = "Proposé par",
                        DataPropertyName = "Proposer"  // Assurez-vous que cette propriété existe et est correctement peuplée
                    };
                    dataGridViewEchanges.Columns.Add(proposerColumn);

                    var responderColumn = new DataGridViewTextBoxColumn
                    {
                        Name = "Responder",
                        HeaderText = "Répondu par",
                        DataPropertyName = "Responder"  // Assurez-vous que cette propriété existe et est correctement peuplée
                    };
                    dataGridViewEchanges.Columns.Add(responderColumn);

                    var objetsColumn = new DataGridViewTextBoxColumn
                    {
                        Name = "Objets",
                        HeaderText = "Objets échangés",
                        DataPropertyName = "ObjetsString"
                    };
                    dataGridViewEchanges.Columns.Add(objetsColumn);

                    var descriptionColumn = new DataGridViewTextBoxColumn
                    {
                        Name = "Description",
                        HeaderText = "Description",
                        DataPropertyName = "Description"
                    };
                    dataGridViewEchanges.Columns.Add(descriptionColumn);

                    var statusColumn = new DataGridViewTextBoxColumn
                    {
                        Name = "Status",
                        HeaderText = "Statut",
                        DataPropertyName = "Status"
                    };
                    dataGridViewEchanges.Columns.Add(statusColumn);

                    var createdAtColumn = new DataGridViewTextBoxColumn
                    {
                        Name = "CreatedAt",
                        HeaderText = "Créé le",
                        DataPropertyName = "Created_At"
                    };
                    dataGridViewEchanges.Columns.Add(createdAtColumn);

                    // Transformez les données pour générer la chaîne d'objets
                    var bindingList = new BindingList<EchangeViewModel>();

                    foreach (var echange in echanges)
                    {
                        var objetsString = string.Join(", ", echange.EchangeDetails.Select(ed => ed.Objet.Name));
                        bindingList.Add(new EchangeViewModel
                        {
                            Proposer = echange.Proposer?.Username ?? "N/A",
                            Responder = echange.Responder?.Username ?? "N/A",
                            ObjetsString = objetsString,
                            Description = echange.Description,
                            Status = echange.Status,
                            Created_At = echange.created_at.ToString("dd/MM/yyyy")
                        });
                    }

                    dataGridViewEchanges.AutoGenerateColumns = false;
                    dataGridViewEchanges.DataSource = bindingList;
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
