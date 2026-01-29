import asyncio
import json

from services.llm.llm import gemini_general
from services.llm.registry import get_llm
from services.translation.registry import get_translator

translator = get_translator()
llm = get_llm()


# fucntion to load data from schemes.json
def load_data():
    with open("data/schemes.json", "r") as f:
        return json.load(f)


# calling load_data function to get data from scheme.json
data = load_data()


# function to search scheme by id
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


# function to handle scheme chat
async def scheme_chat(payload):
    # storing values from payload
    domain = payload.domain.strip().lower()
    scheme_id = payload.scheme_id
    state = payload.state.strip().lower()
    question = payload.question

    # translating local language to english
    question = await asyncio.to_thread(translator.translate_to_english, question)

    # calling search_scheme function to get scheme by id
    scheme = search_scheme(data, scheme_id, state, domain)
    if scheme is None:
        return {"answer": "Scheme not found for the given ID, state, and domain."}

    answer = await asyncio.to_thread(llm.generate, scheme, question, domain)

    answer = await asyncio.to_thread(translator.translate_to_local, answer)

    return {"answer": f"{answer}"}


# function to handle general chat
async def general_chat(payload):
    question = payload.question
    answer = await asyncio.to_thread(gemini_general, question)
    return {"answer": f"{answer}"}
