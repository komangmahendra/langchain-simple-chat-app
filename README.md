### To run this repo

```
npm install
npm run dev
```

```
open http://localhost:3000
```

### Course certificate

[Learn LangChain by building FAST a real world generative ai LLM powered application LLM (Python, Latest Version 0.3.0)](https://www.udemy.com/certificate/UC-0812d383-a677-4bc2-a794-5baaea7ca539/)

### A quick summary of what was created in this repo

This repo is about using the langchain framework to create a simple chat app to ask questions about movies and ask for a quota to watch in theaters.
The context used in this app consists of 3 authored movie synopses.

1. Memulai di Paruh Baya.
2. Pergi ke Rumah Nenek.
3. Perjalanan Menjadi Programmer.

In terms of creating context in the form of a vector database, it is assisted by using openAI with the `text-embedding-3-small` model to convert text into vectors, then stored in the Pinecone vector database.

To use a more dynamic LLM, this repo uses an agent that will determine which tools will be used according to the context obtained from the user. For example, when we need information about movie theater quotas, the agent executor will determine which function is most suitable for obtaining this information in this case, the `getQuotaByDate` function will be executed, then the output results will be beautified by the LLM to be displayed to the user side.

For now the thing that is made can answer according to the existing context, but still needs improvement to be even better in terms of answering the context of the user.

### Example

```
# ask about quota
# endpoint : http://localhost:3000/chat
# payload: {
    question: 'Berapa kuota menonton pada tanggal 1 Oktober 2024' ?
  }
# response: {
	"answer": {
		"input": "Berapa kuota menonton pada tanggal 1 Oktober 2024",
		"output": "Kuota menonton pada tanggal 1 Oktober 2024 adalah 10."
	}
  }
```

```
# ask about movie
# endpoint : http://localhost:3000/chat
# payload: {
    question: "Siapa pemeran dalam film pergi ke rumah nenek ?"
  }
# response : {
	"answer": {
		"input": "Siapa pemeran dalam film pergi ke rumah nenek ?",
		"output": "Pemeran utama dalam film \"Pergi ke Rumah Nenek\" adalah Arya, seorang remaja berusia 16 tahun. Neneknya juga memiliki peran penting dalam cerita. Namun, informasi lebih lanjut tentang pemeran lain atau karakter tambahan tidak tersedia."
	}
  }
```
