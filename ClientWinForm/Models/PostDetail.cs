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
        public int PostId { get; set; }
        public int ItemId { get; set; }
        public Objet Objet { get; set; }
    }
}
