namespace ClientWinForm
{
    public partial class LoginForm : Form
    {
        public LoginForm()
        {
            InitializeComponent();

            // Mettre la fenêtre en mode maximisé
            this.WindowState = FormWindowState.Normal;
            this.Text = "Login"; // Changer le titre de la fenêtre

            // Ajouter un logo au centre en haut (facultatif)
            PictureBox pictureBox = new PictureBox();
            pictureBox.Image = Image.FromFile("images/icon.png");
            pictureBox.Location = new Point((this.ClientSize.Width - 100) / 2, 20);
            pictureBox.Size = new Size(100, 100);
            pictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
            pictureBox.Anchor = AnchorStyles.Top;
            this.Controls.Add(pictureBox);

            // Ajouter le GroupBox centré sur la page
            GroupBox groupBox = new GroupBox();
            groupBox.Text = "Login";
            groupBox.Size = new Size(300, 200);
            groupBox.Location = new Point((this.ClientSize.Width - groupBox.Width) / 2, (this.ClientSize.Height - groupBox.Height) / 2);
            groupBox.Anchor = AnchorStyles.None;
            this.Controls.Add(groupBox);

            // Ajouter les contrôles de connexion dans le GroupBox
            Label lblUsername = new Label();
            lblUsername.Text = "Username:";
            lblUsername.Font = new Font("Arial", 10, FontStyle.Regular);
            lblUsername.Location = new Point(20, 30);
            lblUsername.Size = new Size(100, 20);
            groupBox.Controls.Add(lblUsername);

            TextBox txtUsername = new TextBox();
            txtUsername.Location = new Point(130, 30);
            txtUsername.Size = new Size(150, 20);
            groupBox.Controls.Add(txtUsername);

            Label lblPassword = new Label();
            lblPassword.Text = "Password:";
            lblPassword.Font = new Font("Arial", 10, FontStyle.Regular);
            lblPassword.Location = new Point(20, 70);
            lblPassword.Size = new Size(100, 20);
            groupBox.Controls.Add(lblPassword);

            TextBox txtPassword = new TextBox();
            txtPassword.Location = new Point(130, 70);
            txtPassword.Size = new Size(150, 20);
            txtPassword.PasswordChar = '*';
            groupBox.Controls.Add(txtPassword);

            Button btnLogin = new Button();
            btnLogin.Text = "Login";
            btnLogin.Font = new Font("Arial", 10, FontStyle.Bold);
            btnLogin.BackColor = Color.LightBlue;
            btnLogin.ForeColor = Color.DarkBlue;
            btnLogin.Location = new Point(100, 110);
            btnLogin.Size = new Size(80, 30);
            groupBox.Controls.Add(btnLogin);

            // Redimensionner et repositionner les contrôles lorsque la fenêtre est redimensionnée
            this.Resize += (sender, e) =>
            {
                groupBox.Location = new Point((this.ClientSize.Width - groupBox.Width) / 2, (this.ClientSize.Height - groupBox.Height) / 2);
                pictureBox.Location = new Point((this.ClientSize.Width - pictureBox.Width) / 2, 20);
            };
        }





    }
}
