from dotenv import load_dotenv
import os

load_dotenv()
class TemplateGeneratorConfig:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.system_role = {
            "role": "system",
            "content": """
            You are a creative React frontend developer who takes instructions from client and create beautiful 
            components as per the user requirements. Based on your experience as a developer you can add fetures that the client might miss out.
            """
        }
        self.user_role = {
            "role": "user",
            "content": """
            You have to create a single react component as per the requirement mentioned below. You have to be creative 
            when doing this, the component should be a template that can be edited by user.
            The entire output should only contain jsx. No other descripion should be in the output. No css file should be there.
            Everything should be written on jsx file.
            Main task : Create a react component as per the requirement.
            1) You have to be creative. 
            2) Use a color theme and should follow color theory. The entire component should be focued few colors.
            3) Component should be responsive.
            4) Add more styles and creative content. Style the buttons, text fields, lists etc.
            5) Focus on borders, spacing  and proper allignments.
            6) Should use a font style and follow typology principles.
            8) Never use fixed position. All elements should be relative.
            9) All heights and weights calculations should be based on %. for example height:100%.
            10) Exclude functions like onclick, onhandle, onchange, Import and export component part.
            11) Include more styling.
            12) The component should look professional.
            
            Example of a requirement : 
            Give a component for displaying a title.
            The output is :
                <div>
                <h1>This is a Title</h1>
                </div>
                
            Following are the real requirements :
            """
        }
        