using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Configuration;

namespace ClientWinForm
{
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();
        }

        private async void buttonLogin_Click(object sender, EventArgs e)
        {
            string email = textBoxEmail.Text;
            string password = textBoxPassword.Text;

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Please enter both email and password.");
                return;
            }

            string baseUri = ConfigurationManager.AppSettings["BaseUri"];
            using (HttpClient client = new HttpClient())
            {
                var loginData = new
                {
                    username = email,
                    password = password
                };

                var content = new StringContent(JsonConvert.SerializeObject(loginData), Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync($"{baseUri}/users/login", content);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<LoginResponse>(responseData);

                    string authToken = result.Token;
                    this.Hide();
                    

                    MainForm mainForm = new MainForm(authToken);
                    mainForm.Show();
                }
                else
                {
                    MessageBox.Show("Verifier vos informations.");
                }
            }
        }


        public class LoginResponse
        {
            public string Token { get; set; }
        }

    }
}
