from os.path import expanduser, join, exists
import json

CFG_SERVER_FILE = 'server.json'
CFG_TOKEN_FILE = 'token.txt'
CFG_CLASSIFICATION_FILE = 'classification.json'

class Config:
    def __init__(self, config_path):
        self.config_path = expanduser(config_path)

    def get_server_info(self):
        file = join(self.config_path, CFG_SERVER_FILE)
        if exists(file):
            with open(file) as f:
                return json.loads(f.read())
        else:
            return None

    def set_server_info(self, server_info):
        file = join(self.config_path, CFG_SERVER_FILE)
        with open(file, 'w') as f:
            f.write(json.dumps(server_info))

    def get_token(self):
        file = join(self.config_path, CFG_TOKEN_FILE)
        if exists(file):
            with open(file) as f:
                return json.loads(f.read())
        else:
            return None

    def set_token(self, token):
        file = join(self.config_path, CFG_TOKEN_FILE)
        with open(file, 'w') as f:
            f.write(json.dumps(token))

    def get_classification(self):
        file = join(self.config_path, CFG_CLASSIFICATION_FILE)
        if exists(file):
            with open(file) as f:
                return json.loads(f.read())
        else:
            return None

    def set_classification(self, classification):
        file = join(self.config_path, CFG_CLASSIFICATION_FILE)
        print("  write to file", file)
        with open(file, 'w') as f:
            print("   actually writing classification")
            print(classification)
            f.write(json.dumps(classification))

