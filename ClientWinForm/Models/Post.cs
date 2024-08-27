﻿using System;
using System.Collections.Generic;

namespace ClientWinForm.Models
{
    public class Post
    {
        public int poste_id { get; set; }
        public int user_id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Titre { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public Utilisateur Utilisateur { get; set; }
        public List<PostDetail> Postedetails { get; set; }
        public List<Echange> Echanges { get; set; } // Nouvelle propriété pour les échanges
    }
}
