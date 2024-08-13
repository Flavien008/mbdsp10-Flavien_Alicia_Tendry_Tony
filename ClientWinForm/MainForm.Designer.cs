using System;

namespace ClientWinForm
{
    partial class MainForm
    {
        private string authToken;
        public MainForm(string token)
        {
            InitializeComponent();
            authToken = token;
        }
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        /// 
        private void buttonLogout_Click(object sender, EventArgs e)
        {
            // Afficher à nouveau le formulaire de connexion
            Login loginForm = new Login();
            loginForm.Show();

            // Fermer la MainForm actuelle
            this.Close();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            // Charger les données initiales ici
        }
        private void InitializeComponent()
        {
            this.buttonLogout = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // buttonLogout
            // 
            this.buttonLogout.Location = new System.Drawing.Point(12, 12);
            this.buttonLogout.Name = "buttonLogout";
            this.buttonLogout.Size = new System.Drawing.Size(100, 30);
            this.buttonLogout.TabIndex = 0;
            this.buttonLogout.Text = "Déconnexion";
            this.buttonLogout.UseVisualStyleBackColor = true;
            this.buttonLogout.Click += new System.EventHandler(this.buttonLogout_Click);
            // 
            // MainForm
            // 
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.buttonLogout);
            this.Name = "MainForm";
            this.Text = "Main Application";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.ResumeLayout(false);

        }

        private System.Windows.Forms.Button buttonLogout;

        #endregion
    }
}