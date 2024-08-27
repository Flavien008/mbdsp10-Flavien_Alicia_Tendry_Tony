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

            dataGridViewEchanges.CellClick += dataGridViewEchanges_CellClick;

            LoadPostDetails();
            LoadEchangesAsync();
        }

        private void LoadPostDetails()
        {
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
                    dataGridViewEchanges.Columns.Clear();

       
                    dataGridViewEchanges.Columns.Add(new DataGridViewTextBoxColumn
                    {
                        Name = "Proposer",
                        HeaderText = "Proposé par",
                        DataPropertyName = "Proposer"
                    });

                    dataGridViewEchanges.Columns.Add(new DataGridViewTextBoxColumn
                    {
                        Name = "Responder",
                        HeaderText = "Répondu par",
                        DataPropertyName = "Responder"
                    });

                    dataGridViewEchanges.Columns.Add(new DataGridViewTextBoxColumn
                    {
                        Name = "Objets",
                        HeaderText = "Objets échangés",
                        DataPropertyName = "ObjetsString"
                    });

                    dataGridViewEchanges.Columns.Add(new DataGridViewTextBoxColumn
                    {
                        Name = "Description",
                        HeaderText = "Description",
                        DataPropertyName = "Description"
                    });

                    dataGridViewEchanges.Columns.Add(new DataGridViewTextBoxColumn
                    {
                        Name = "Status",
                        HeaderText = "Statut",
                        DataPropertyName = "Status"
                    });

                    dataGridViewEchanges.Columns.Add(new DataGridViewTextBoxColumn
                    {
                        Name = "CreatedAt",
                        HeaderText = "Créé le",
                        DataPropertyName = "Created_At"
                    });

                    // Ajouter la colonne de validation
                    var validateButtonColumn = new DataGridViewButtonColumn
                    {
                        Name = "Validate",
                        HeaderText = "Valider",
                        Text = "Valider",
                        UseColumnTextForButtonValue = true,
                        Width = 80
                    };
                    dataGridViewEchanges.Columns.Add(validateButtonColumn);

                    // Transformez les données pour générer la chaîne d'objets
                    var bindingList = new BindingList<EchangeViewModel>();

                    foreach (var echange in echanges)
                    {
                        var objetsString = string.Join(", ", echange.EchangeDetails.Select(ed => ed.Objet.Name));
                        bindingList.Add(new EchangeViewModel
                        {
                            Id = echange.Id,
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

                    foreach (DataGridViewRow row in dataGridViewEchanges.Rows)
                    {
                        var statusCell = row.Cells["Status"];

                        if (statusCell != null && statusCell.Value != null && statusCell.Value.ToString() != "pending")
                        {
                            var cell = (DataGridViewButtonCell)row.Cells["Validate"];
                            cell.FlatStyle = FlatStyle.Flat;
                            cell.Style.ForeColor = cell.Style.BackColor;
                            cell.ReadOnly = true;
                        }
                    }

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



        private void dataGridViewEchanges_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == dataGridViewEchanges.Columns["Validate"].Index)
            {
                var selectedEchange = (EchangeViewModel)dataGridViewEchanges.Rows[e.RowIndex].DataBoundItem;
                if (selectedEchange != null && selectedEchange.Status == "pending")
                {
                   
                    ValidateEchange(selectedEchange.Id);
                }
            }
        }


        private async void ValidateEchange(int echangeId)
        {
            try
            {
                var success = await _postService.ValidateEchangeAsync(echangeId);

                if (success)
                {
                    MessageBox.Show("L'échange a été validé avec succès.");
                    await LoadEchangesAsync(); 
                }
                else
                {
                    MessageBox.Show("Erreur lors de la validation de l'échange.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur: {ex.Message}");
            }
        }





    }
}
