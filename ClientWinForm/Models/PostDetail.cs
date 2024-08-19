using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientWinForm.Models
{
    public class PostDetail
    {
        public int PosteDetailsId { get; set; }
        public int post_id { get; set; }
        public int objet_id { get; set; }
        public Objet Objet { get; set; }
    }
}
