using System;
using System.Collections.Generic;

namespace ClientWinForm.Models
{
    public class Echange
    {
        public int Id { get; set; }
        public DateTime created_at { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime updated_at { get; set; }
        public int post_id { get; set; }
        public int proposer_id { get; set; }
        public int responder_id { get; set; }
        public Utilisateur Proposer { get; set; }
        public Utilisateur Responder { get; set; }
        public Post Poste { get; set; }
        public List<EchangeDetail> EchangeDetails { get; set; }
    }

    public class EchangeDetail
    {
        public int Id { get; set; }
        public int EchangeId { get; set; }
        public int ObjetId { get; set; }
        public Objet Objet { get; set; }
    }
}
