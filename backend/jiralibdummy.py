import json
import time

lbl_in_review = 'inReview'

# Note:
# This is a dummy JiraLib implementation.
# It's here to test some functionality without actually accessing a Jira API.
# Arguments are actually ignored. They are just here to keep the interfacwe
# in sync with the actual JiraLib.
# Only dummy JSONs are returned
class JiraLib:
    def initialize(self, config, token):
        pass

    def get_all_statuses(self):
        return [
            ["1" , "ToDo"],
            ["2" , "In Progress"],
            ["3" , "Blocked"],
            ["4" , "In Review"],
            ["5" , "Done"]
        ]
    
    def get_active_sprints(self):
        time.sleep(1)
        return [
            { 'id': '1', 'state': 'active', 'name': 'Sample Sprint 1'},
            { 'id': '2', 'state': 'active', 'name': 'Sample Sprint 2'},

        ]

    def get_jiras_in_sprint(self, sprint_id):
        time.sleep(0.2)
        return {
                '1' : [
                    {'id' : 1001, 'key': "NN2-1001", 'fields':{
                        'labels': [],
                        'assignee' : {'displayName' : 'Homer Simpson'},
                        'summary' : "Create Docker image (native)",
                        'status': {'id' : '1'}
                    }},
                    {'id' : 1002, 'key': "NN2-1002", 'fields':{
                        'labels': [],
                        'assignee' : {'displayName' : 'Homer Simpson'},
                        'summary' : "Create Docker image (multi-arch)",
                        'status': {'id' : '1'}
                    }},
                    {'id' : 1003, 'key': "NN2-1003", 'fields':{
                        'labels': [],
                        'assignee' : {'displayName' : 'Lisa Simpson'},
                        'summary' : "Backup to other laptop",
                        'status': {'id' : '4'}
                    }},
                    {'id' : 1004, 'key': "NN2-1004", 'fields':{
                        'labels': ['review'],
                        'summary' : "Review Angular code",
                        'status': {'id' : '2'}
                    }},
                    {'id' : 1005, 'key': "NN2-1005", 'fields':{
                        'labels': ['test'],
                        'summary' : "Test Docker image on Mac",
                        'status': {'id' : '3'}
                    }},
                    {'id' : 1006, 'key': "NN2-1006", 'fields':{
                        'labels': [],
                        'assignee' : {'displayName' : 'Bart Simpson'},
                        'summary' : "Finish classification editor",
                        'status': {'id' : '4'}
                    }},
                ],
                '2' : [

                    {'id' : 2001, 'key': "NN2-2001", 'fields':{
                        'labels': [],
                        'summary' : "A ticket still in ToDo state",
                        'status': {'id' : '1'}
                    }},
                    {'id' : 2002, 'key': "NN2-2002", 'fields':{
                        'labels': [],
                        'assignee' : {'displayName' : 'Homer Simpson'},
                        'summary' : "Now this ticket is in progress",
                        'status': {'id' : '2'}
                    }},
                    {'id' : 2003, 'key': "NN2-2003", 'fields':{
                        'labels': [],
                        'assignee' : {'displayName' : 'Homer Simpson'},
                        'summary' : "This ticket is blocked",
                        'status': {'id' : '3'}
                    }},
                    {'id' : 2004, 'key': "NN2-2004", 'fields':{
                        'labels': ["review"],
                        'assignee' : {'displayName' : 'Homer Simpson'},
                        'summary' : "This ticket is currently being reviewed",
                        'status': {'id' : '2'}
                    }},
                    {'id' : 2005, 'key': "NN2-2005", 'fields':{
                        'labels': ["review"],
                        'summary' : "This should be reviewed, but is not assigned to anyone",
                        'status': {'id' : '2'}
                    }},
                    {'id' : 2006, 'key': "NN2-2006", 'fields':{
                        'labels': ["test"],
                        'assignee' : {'displayName' : 'Marge Simpson'},
                        'summary' : "Currently tested by Marge",
                        'status': {'id' : '2'}
                    }},
                    {'id' : 2007, 'key': "NN2-2007", 'fields':{
                        'labels': ["test"],
                        'summary' : "Now who is gonna test this",
                        'status': {'id' : '2'}
                    }},
                    {'id' : 2008, 'key': "NN2-2008", 'fields':{
                        'labels': [],
                        'assignee' : {'displayName' : 'Bart Simpson'},
                        'summary' : "A also a ticket that is done",
                        'status': {'id' : '4'}
                    }},
                ],
        }[str(sprint_id)]

