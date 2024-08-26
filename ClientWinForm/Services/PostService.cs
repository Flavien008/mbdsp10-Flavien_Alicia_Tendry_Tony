using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ClientWinForm.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ClientWinForm.Services
{
    public class PostService
    {
        private readonly HttpClient _httpClient;
        private readonly string _token;

        public PostService(string token)
        {
            _httpClient = new HttpClient();
            _token = token;
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        public async Task<JObject> GetPostsAsync(string dateDebut, string dateFin, string nomUtilisateur, string texte, string nomObjet, string categorieObjet, int status, string sortByDate, int page, int limit)
        {
            string baseUri = ConfigurationManager.AppSettings["BaseUri"];
            string url = $"{baseUri}/postes?page={page}&limit={limit}&dateDebut={dateDebut}&dateFin={dateFin}&nomUtilisateur={nomUtilisateur}&texte={texte}&nomObjet={nomObjet}&categorieObjet={categorieObjet}&status={status}&sortByDate={sortByDate}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                return JObject.Parse(content);
            }

            return null;
        }

        public async Task<bool> DeletePostAsync(string postId)
        {
            try
            {
                string baseUri = ConfigurationManager.AppSettings["BaseUri"];
                string url = $"{baseUri}/postes/{postId}";

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);
                    HttpResponseMessage response = await client.DeleteAsync(url);

                    return response.IsSuccessStatusCode;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur: {ex.Message}");
                return false;
            }
        }

        public async Task<List<Echange>> GetEchangesByPostIdAsync(int postId)
        {
            try
            {
                string baseUri = ConfigurationManager.AppSettings["BaseUri"];
                string url = $"{baseUri}/echanges/post/{postId}";

                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    return JArray.Parse(content).ToObject<List<Echange>>();
                }

                return null;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur lors de la récupération des échanges: {ex.Message}");
                return null;
            }
        }

        public async Task<Post> GetPostByIdAsync(string postId)
        {
            try
            {
                string baseUri = ConfigurationManager.AppSettings["BaseUri"];
                string url = $"{baseUri}/postes/{postId}";

                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    return JObject.Parse(content).ToObject<Post>();
                }
                else
                {
                    MessageBox.Show("Erreur lors de la récupération des détails du poste.");
                    return null;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur lors de la récupération du poste: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> ValidateEchangeAsync(int echangeId)
        {
            try
            {
                string baseUri = ConfigurationManager.AppSettings["BaseUri"];
                string url = $"{baseUri}/echanges/{echangeId}";

                var payload = new { status = "validé" };
                var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

                HttpResponseMessage response = await _httpClient.PutAsync(url, content);

                // Ajoutez une vérification du statut de la réponse
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    MessageBox.Show($"Erreur de l'API : {response.StatusCode}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur lors de l'appel de l'API : {ex.Message}");
                return false;
            }
        }




    }
}
