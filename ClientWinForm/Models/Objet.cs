using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientWinForm.Models
{
    public class Objet
    {
        public int ItemId { get; set; }
        public int UserId { get; set; }
        public int CategorieId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Categorie Categorie { get; set; }
    }
}
