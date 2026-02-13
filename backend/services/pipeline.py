import asyncio
import json

# importing llm and translation helpers
from services.llm.llm import gemini_general
from services.llm.registry import get_llm
from services.languages.registry import get_translator

# creating llm instance
llm = get_llm()


# function to load data from schemes.json
def load_data():
    with open("data/schemes.json", "r") as f:
        return json.load(f)


# loading data once when server starts
data = load_data()


# function to search scheme by scheme id,state and domain
def search_scheme(data, scheme_id, state, domain):
    try:
        data = data[state][domain]
    except KeyError:
        return None

    # searching for scheme id in data
    for scheme in data:
        if scheme["id"] == scheme_id:
            scheme = scheme
            return scheme
    return None


# function to handle scheme-based chat flow
async def scheme_chat(payload):
    # storing values from payload
    domain = payload.domain.strip().lower()
    scheme_id = payload.scheme_id
    state = payload.state.strip().lower()
    question = payload.question
    language=payload.language

    # translator instance
    translator = get_translator(language)
    # translating question from local language to english
    question = await asyncio.to_thread(translator.translate_to_english, question)

    # calling search_scheme function to get scheme by id
    scheme = search_scheme(data, scheme_id, state, domain)
    if scheme is None:
        return {"answer": "Scheme not found for the given ID, state, and domain."}

    # generate answer using scheme data
    answer = await asyncio.to_thread(llm.generate, scheme, question, domain)

    # translating answer from english language to local
    answer = await asyncio.to_thread(translator.translate_to_local, answer)

    return {"answer": answer}


# function to handle general chat
async def general_chat(payload):
    question = payload.question
    language=payload.language

    # call gemini for general chat
    answer = await asyncio.to_thread(gemini_general, question,language)
    return {"answer": answer}
