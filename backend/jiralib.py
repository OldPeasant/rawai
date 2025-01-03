from jira import JIRA

class JiraLib:
    def initialize(self, server, token):
        self.server = server
        headers = JIRA.DEFAULT_OPTIONS["headers"].copy()
        headers["Authorization"] = f"Bearer {token}"
        self.jira = JIRA(server=self.server.host, options={"headers": headers})

    def get_active_sprints(self):
        act = []
        for s in self.jira.sprints(self.server.board):
            if s.state == 'active':
                act.appoend(s.raw)
        return act

    def get_jiras_in_sprint(self, sprint_id):
        all_jiras = []
        page_size = 100
        current_index = 0
        while True:
            query = f"project={self.server.project} and labels={self.server.labels} and sprint={sprint_id}"
            issues = self.jira.search_issues(query, startAt=current_index, maxResults=page_size)
            if len(issues) == 0:
                break
            for issue in issues:
                all_jiras.append(issue.raw)
        return all_jiras

    # ToDo test if this works
    def get_all_statuses(self):
        return self.jira.statuses()
