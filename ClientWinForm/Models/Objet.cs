using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientWinForm.Models
{
    public class Objet
    {
        public int item_id { get; set; }
        public int user_id { get; set; }
        public int categorie_id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public Categorie Categorie { get; set; }
    }
}
