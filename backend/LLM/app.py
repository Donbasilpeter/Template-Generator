import re
from LLM.config import TemplateGeneratorConfig
from LLM.LLMGenerator import LLMGenerator

class AppBuilder:
    def __init__(self):
        self.app = LLMGenerator(TemplateGeneratorConfig())
        self.response = ""

    def build_app(self, requirements):
        self.app.add_requirements(requirements)
        self.response =  self.app.start()
        return self.extract_jsx_code()
    def extract_jsx_code(self):
        pattern = r'```jsx\s*([\s\S]*?)\s*```'
        match = re.search(pattern, self.response)
        if match:
            self.response = match.group(1).strip()
            return self.response
        else:
            return None
    

    
