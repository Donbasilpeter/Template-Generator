from openai import OpenAI

class LLMGenerator:
    def __init__(self, config):
        self.client = OpenAI()
        self.system_role = config.system_role
        self.user_role = config.user_role
        self.api_key = config.api_key
    
    def start(self):
        self.client.api_key = self.api_key
        completion = self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[self.system_role, self.user_role]
        )
        return completion.choices[0].message.content
        
    def add_requirements(self,requirements):
        self.user_role["content"] = self.user_role["content"] + requirements
