using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientWinForm.Models
{
    public class EchangeViewModel
    {
        public string Proposer { get; set; }
        public string Responder { get; set; }
        public string ObjetsString { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string Created_At { get; set; }
    }

}
