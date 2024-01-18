using Microsoft.AspNetCore.SignalR;
using RealTimeCollab.Models;

namespace RealTimeCollab.Hub;

public class EditorHub : Microsoft.AspNetCore.SignalR.Hub
{
    private static List<FileState> FileStates = new List<FileState> {
        new FileState { 
            FileName = "file1.json", 
            Content = "", 
            EditDate = "", 
            EditAuthor = "", 
            Collaborators = new List<Collaborator>(),
        },
        new FileState { 
            FileName = "file2.json", 
            Content = "", 
            EditDate = "", 
            EditAuthor = "", 
            Collaborators = new List<Collaborator>() ,
        },
        new FileState { 
            FileName = "file3.json", 
            Content = "", 
            EditDate = "", 
            EditAuthor = "", 
            Collaborators = new List<Collaborator>(),
        },
    };

    public EditorHub() {}

    public override async Task OnDisconnectedAsync(Exception exception)
    {

        foreach (var file in FileStates)
        {
            var collaboratorToRemove = 
            file.Collaborators.FirstOrDefault(collaborator => collaborator.ConnectionId == Context.ConnectionId);

            if (collaboratorToRemove != null)
            {
                file.Collaborators.Remove(collaboratorToRemove);
                await Clients.Group(file.FileName).SendAsync("UserLeft", file.Collaborators);
            }
        }
    }

    public async Task UpdateFile(string groupName, string content)
    {
        await Clients.OthersInGroup(groupName).SendAsync("ReceiveFileUpdate", content);
    }


    public async Task JoinFileGroup(string fileName, string userName)
    {
        var currenFile = FileStates.FirstOrDefault(f => f.FileName == fileName);
        var newCollaborator = new Collaborator
        {
            UserName = userName,
            ConnectionId = Context.ConnectionId
        };

        currenFile.Collaborators.Add(newCollaborator);
        await Groups.AddToGroupAsync(Context.ConnectionId, fileName);
        await Clients.Group(fileName).SendAsync("UserJoined", currenFile.Collaborators);
        await Clients.Caller.SendAsync("ReceiveFileStates", FileStates);
    }

    public async Task LeaveFileGroup(string fileName, string userName)
    {
        var currenFile = FileStates.FirstOrDefault(f => f.FileName == fileName);
        currenFile.Collaborators.RemoveAll(collaborator => collaborator.UserName == userName);
        
        await Clients.Group(fileName).SendAsync("UserLeft", currenFile.Collaborators);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, fileName);
        await Clients.Caller.SendAsync("ReceiveFileStates", FileStates);
    }

    public async Task UpdateFileContent(string fileName, string content, string userName)
    {   
        var existingFile = FileStates.FirstOrDefault(f => f.FileName == fileName);
        DateTime currentDateTime = DateTime.Now;
        string formattedDateTime = currentDateTime.ToString("yyyy-MM-dd HH:mm:ss");

        existingFile.Content = content;
        existingFile.EditDate = formattedDateTime;
        existingFile.EditAuthor = userName;

        await Clients.Group(fileName).SendAsync("FileUpdated", fileName, content);
    }

    public async Task SendFileStates()
    {
        await Clients.Caller.SendAsync("ReceiveFileStates", FileStates);
    }
    
}