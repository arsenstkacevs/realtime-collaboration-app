namespace RealTimeCollab.Models
{
    public class FileState
    {
        public string FileName { get; set; }
        public string Content { get; set; }
        public string EditDate {get; set; }
        public string EditAuthor {get; set; }
        public List<Collaborator> Collaborators { get; set; } = new List<Collaborator>();
        public string ConnectionId { get; set; }
    }

    public class Collaborator {
        public string UserName { get; set; } 
        public string ConnectionId { get; set; }
    }
}