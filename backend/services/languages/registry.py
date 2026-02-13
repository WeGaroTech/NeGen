from services.languages.garo.translator import GaroTranslator


# function to get translator instance
def get_translator(language:str):
    language=language.lower()

    translator={
        "garo":GaroTranslator
    }
    
    if language not in translator:
        raise ValueError("Unsupported Language")

    return translator[language]()
    
