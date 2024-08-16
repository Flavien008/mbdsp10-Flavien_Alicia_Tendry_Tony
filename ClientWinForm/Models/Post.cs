using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientWinForm.Models
{
    public class Post
    {
        public int PosteId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Titre { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public Utilisateur Utilisateur { get; set; }
        public List<PostDetail> Postedetails { get; set; }
    }
}
