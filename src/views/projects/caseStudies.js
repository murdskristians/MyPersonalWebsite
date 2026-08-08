// Case-study content keyed by project slug, rendered by CaseStudy.vue at
// /projects/:id. Rich entries are drawn from the actual project repositories;
// smaller practice projects are intentionally brief and honest about their scope.

export const caseStudies = {
	"e-store": {
		slug: "e-store",
		title: "E-Store Demo",
		tags: ["Full-Stack", "AI Agent", "Personal project"],
		lede:
			"An adaptive e-commerce storefront whose home page is assembled live by an AI agent — different for every visitor, streamed in as it's generated.",
		live: "https://e-store-demo-e1d0348a.netlify.app",
		source: "e-store-demo",
		meta: { role: "Solo — full-stack", type: "Personal project", status: "Live in production" },
		overview: [
			"Most storefronts serve the same landing page to everyone. This one doesn't. Instead of a fixed homepage, an AI agent composes the landing sections per visitor — reading their browsing behavior and returning a tailored layout that streams in section by section over a WebSocket.",
			"It's a small demo with a real spine behind it: a Python API, an async database, an AI orchestration layer, and the production plumbing to keep all of it alive on free-tier hosting."
		],
		architecture: [
			{ role: "Front end", title: "Vue 3 SPA", body: "Vue 3 + TypeScript with Pinia stores and a Vite build. Reactive cart, product views, and a progressively-rendered home feed. Deployed on Netlify." },
			{ role: "Back end", title: "FastAPI", body: "Python FastAPI with async SQLAlchemy over SQLite, packaged in Docker and deployed on Render. REST for catalog & cart, WebSocket for the streaming home page." },
			{ role: "AI layer", title: "Agent", body: "The Claude Agent SDK drives an agent that generates personalized home sections from the shopper's tracked behavior, pushed to the client as they're produced." }
		],
		highlights: [
			{ title: "Streaming, not spinning", body: "Home sections render the moment the agent emits them over WebSocket, so the page fills in progressively instead of blocking on one slow response." },
			{ title: "Cold-start resilience", body: "A retry/backoff layer on the API client wakes a sleeping free-tier backend gracefully — the store shows a “warming up” state instead of an empty shelf." },
			{ title: "Memory-safe by design", body: "The agent process is heavy (~600 MB peak), so it's gated behind a feature flag — it can never OOM the 512 MB instance and take the storefront down with it." },
			{ title: "Adaptive personalization", body: "Viewed, carted, and purchased items feed an “expertise” profile the agent reads from — the experience sharpens the more you interact." }
		],
		stack: [
			{ group: "Front end", items: ["Vue 3", "TypeScript", "Pinia", "Vite", "Axios"] },
			{ group: "Back end", items: ["FastAPI", "Python", "SQLAlchemy (async)", "SQLite", "WebSocket"] },
			{ group: "AI & infra", items: ["Claude Agent SDK", "Docker", "Render", "Netlify"] }
		]
	},

	// --- AI & LLM applications ---

	"ai-studio": {
		slug: "ai-studio",
		title: "AI Studio",
		tags: ["AI", "React", "TypeScript"],
		lede: "A browser-based studio for building and chatting with custom AI agents, wired to multiple LLM providers with no backend or account required.",
		live: "https://ai-studio-agent-creator.netlify.app",
		source: "ai-studio",
		meta: { role: "Solo — front-end", type: "Personal project", status: "Live" },
		overview: [
			"AI Studio is a client-only React + TypeScript app for creating custom chat bots, configuring their system prompt and generation parameters, and talking to them across several AI providers from one interface. Users bring their own API keys, which — along with bot definitions and conversation history — are stored entirely in the browser's localStorage, so nothing leaves the machine except the calls to the AI providers themselves.",
			"Bots can be exported and re-imported as JSON files, making configurations portable between browsers without any server or database."
		],
		architecture: [
			{ role: "Front end", title: "React SPA (Webpack 5)", body: "A TypeScript single-page app bundled with Webpack and Babel. Global state lives in a React Context; AI responses render through react-markdown and messages/bots are keyed with uuid." },
			{ role: "Provider layer", title: "Pluggable provider abstraction", body: "A BaseProvider class is implemented per vendor — Google Gemini, Groq, and OpenRouter — so the UI talks to a single streaming interface regardless of which model is selected." },
			{ role: "Persistence", title: "localStorage-only", body: "Settings/API keys, bot configs, and conversations are persisted to namespaced localStorage keys. No backend, no auth, no database — deployable as static files." }
		],
		highlights: [
			{ title: "Streaming responses", body: "Each provider exposes an async-generator that yields token chunks, so replies render incrementally in real time." },
			{ title: "Multi-provider abstraction", body: "Adding a provider means implementing one class against a shared interface; the rest of the app is provider-agnostic." },
			{ title: "Portable, private by design", body: "No server means user keys and chat history never leave the browser; bots move between machines via JSON export/import." }
		],
		stack: [
			{ group: "Front end", items: ["React", "TypeScript", "Webpack 5", "Babel", "react-markdown"] },
			{ group: "AI providers", items: ["Google Gemini", "Groq", "OpenRouter"] },
			{ group: "Persistence & tooling", items: ["Browser localStorage", "uuid", "ESLint", "pnpm"] }
		]
	},

	"bigquery-chat": {
		slug: "bigquery-chat",
		title: "BigQuery AI Chat",
		tags: ["AI", "BigQuery", "React"],
		lede: "A natural-language interface to Google BigQuery: ask a question in plain language and Gemini writes, runs, and explains the SQL against a real dataset.",
		live: "https://bigqueryaichat.netlify.app",
		source: "BigQueryAIChat",
		meta: { role: "Solo — full-stack", type: "Personal project", status: "Live" },
		overview: [
			"BigQuery AI Chat turns plain-language questions into executable SQL over a BigQuery dataset. A React front end sends the question to a FastAPI backend, which pulls the live table schema, has Gemini generate a query, executes it on BigQuery, and returns the rows together with a plain-English explanation of what the SQL does.",
			"An optional 'Thinking Mode' runs a second Gemini pass over the returned rows to surface insights, and an ETL layer syncs source records into BigQuery so the chat has real data to query."
		],
		architecture: [
			{ role: "Front end", title: "React module (Module Federation)", body: "A TypeScript React 18 app, built with Webpack 5 Module Federation so it can run standalone or be mounted inside a host application. Includes a model selector, results grid, and a Thinking-Mode toggle." },
			{ role: "Back end", title: "FastAPI + Gemini + BigQuery", body: "A Python FastAPI service with endpoints for NL→SQL generation, query execution, schema/context, and result analysis. It composes a schema-aware prompt, calls Gemini, runs the query via the BigQuery client, and returns rows plus an explanation." },
			{ role: "Data", title: "ETL sync", body: "A separate ETL pipeline loads source records into BigQuery so the assistant queries a live, populated dataset rather than static fixtures." }
		],
		highlights: [
			{ title: "Schema-grounded SQL generation", body: "The backend fetches the dataset's real schema and injects it into the prompt, so generated SQL references actual tables and columns rather than guessed ones." },
			{ title: "Generate, execute, and explain", body: "One request can produce the SQL, run it against BigQuery, and return a natural-language explanation — or stop at SQL-only when execution isn't wanted." },
			{ title: "Thinking Mode", body: "A dedicated analyze-results endpoint runs a follow-up Gemini pass over the returned data to generate insights on demand." },
			{ title: "Per-IP rate limiting", body: "Custom middleware caps requests per IP (ordered ahead of CORS so 429s still carry CORS headers) to protect the public demo's model quota." }
		],
		stack: [
			{ group: "Front end", items: ["React 18", "TypeScript", "Webpack 5 Module Federation"] },
			{ group: "Back end", items: ["Python", "FastAPI", "Uvicorn", "Pydantic"] },
			{ group: "AI & data", items: ["Google Gemini", "Google BigQuery", "ETL sync pipeline"] }
		]
	},

	"smartsuite-search": {
		slug: "smartsuite-search",
		title: "SmartSuite AI Search",
		tags: ["RAG", "AI", "Vector Search"],
		lede: "A retrieval-augmented chat that answers questions over a knowledge base using semantic vector search, with cited sources and cross-language support.",
		live: "https://ragvectorsearchaichat.netlify.app",
		source: "RAG-VectorSearchAIChat",
		meta: { role: "Solo — full-stack", type: "Personal project", status: "Live" },
		overview: [
			"SmartSuite AI Search is a RAG application that answers natural-language questions over a corpus of instructions. A question is embedded, matched against a vector index, and the top passages are handed to Gemini to compose an answer with source citations and similarity scores.",
			"The pipeline is genuinely multilingual: it detects the query language (English, Latvian, Ukrainian), expands the query by translating it, searches across languages, and discounts cross-language matches so same-language sources win. The public build ships a self-contained demo mode that runs the whole retrieval step in the browser with no backend to deploy."
		],
		architecture: [
			{ role: "Front end", title: "React 19 + Vite", body: "A TypeScript SPA with an axios client mirroring the backend's Pydantic models, a top-K filter slider, and a source-attributed message list. Consumes answers over Server-Sent Events." },
			{ role: "Back end", title: "FastAPI RAG pipeline", body: "A Python service orchestrating language detection, query expansion/translation, embedding, vector search, deduplication, and answer generation — with dependencies injected so demo mode reuses the real pipeline rather than a mock path." },
			{ role: "AI & data", title: "Pinecone + Vertex AI + Gemini", body: "Vertex AI text-embedding-005 (768d) embeddings, Pinecone for cosine vector search, and Gemini for answer generation and translation. A Gemini-only fallback can supply neural embeddings without a GCP project." }
		],
		highlights: [
			{ title: "Cross-language query expansion", body: "Non-English questions are translated before search, results are searched per-query and deduplicated best-score-wins, and cross-language matches are discounted to prefer same-language sources." },
			{ title: "SSE token streaming", body: "The UI calls a streaming endpoint that emits the answer token-by-token over Server-Sent Events." },
			{ title: "Credential-free demo mode", body: "When keys are absent the app auto-enables a demo that duck-types the real services — in-memory cosine search over a bundled synthetic corpus — so a fresh clone runs the full pipeline with nothing to pay for." },
			{ title: "Quota & safety guards", body: "Per-IP rate limiting protects the free Gemini quota, and the demo vector store hard-refuses any index whose name matches real data." }
		],
		stack: [
			{ group: "Front end", items: ["React 19", "TypeScript", "Vite", "axios", "react-markdown"] },
			{ group: "Back end", items: ["Python", "FastAPI", "langdetect"] },
			{ group: "AI & data", items: ["Pinecone (vector DB)", "Vertex AI embeddings", "Google Gemini"] }
		]
	},

	"weather-chatbot": {
		slug: "weather-chatbot",
		title: "Weather Chatbot",
		tags: ["AI", "React", "Groq"],
		lede: "A conversational weather assistant that understands plain-language questions in several languages and replies with real forecasts plus a friendly, localized tip.",
		live: "https://wheatherchat.netlify.app",
		source: "weather-chatbot",
		meta: { role: "Solo — full-stack", type: "Personal project", status: "Live" },
		overview: [
			"Weather Chatbot lets you ask about the weather in natural language — in English, Latvian, Russian, or Ukrainian — and answers with live data. A Groq-hosted Llama model parses the free-text question into a structured intent (location, what's being asked, and timeframe), the app geocodes the place and fetches the forecast, and a second Llama model writes a short, practical tip in the user's own language.",
			"The React front end stays key-free by routing both LLM calls through Netlify serverless functions."
		],
		architecture: [
			{ role: "Front end", title: "React 19 + Vite", body: "A TypeScript SPA that manages the chat, calls the weather/geocoding APIs, and orchestrates the two AI function calls." },
			{ role: "Serverless AI", title: "Netlify Functions + Groq", body: "Two serverless endpoints keep the Groq API key server-side: parse-query uses Llama 3.1 8B at temperature 0 to extract structured JSON intent, and generate-insight uses Llama 3.3 70B to write a localized weather tip." },
			{ role: "Data", title: "Open-Meteo", body: "Open-Meteo's free geocoding and forecast APIs supply location resolution and weather data — no key required." }
		],
		highlights: [
			{ title: "Structured intent extraction", body: "The parse step forces a strict JSON schema at temperature 0, turning messy multilingual free text into a reliable query the app can act on." },
			{ title: "Multilingual by design", body: "Both the parser and the tip generator carry per-language vocabulary and examples (EN/LV/RU/UK), including Cyrillic and grammatical-case handling for city names." },
			{ title: "Two-model split", body: "A small fast model does deterministic parsing while a larger model handles natural-language generation — matching model size to task." }
		],
		stack: [
			{ group: "Front end", items: ["React 19", "TypeScript", "Vite", "lucide-react"] },
			{ group: "Serverless", items: ["Netlify Functions"] },
			{ group: "AI & data", items: ["Groq (Llama 3.1 8B + 3.3 70B)", "Open-Meteo API"] }
		]
	},

	"text2sql": {
		slug: "text2sql",
		title: "Text-to-SQL Agent",
		tags: ["AI Agent", "BigQuery", "Python"],
		lede: "A tool-using AI agent built on Google's ADK that converts natural-language questions into SQL, runs them safely on BigQuery, and self-corrects failed queries.",
		live: "https://text2sql-chat.netlify.app",
		source: "text2sql-chat",
		meta: { role: "Solo — full-stack", type: "Personal project", status: "Live" },
		overview: [
			"Text-to-SQL Agent is an agentic natural-language interface to a BigQuery dataset, built on Google's Agent Development Kit (ADK). Rather than a single prompt, it's an LlmAgent (Gemini 2.0 Flash) equipped with function tools to inspect schema, list tables, run queries, sample rows, and compute column statistics — so it can reason about the data before and after writing SQL.",
			"It's tuned for a real bilingual (Latvian/English) procurement dataset, and — notably — an error-handling loop reads a failed query's error, fixes the SQL, and re-runs it automatically."
		],
		architecture: [
			{ role: "Agent", title: "Google ADK LlmAgent", body: "A Gemini-2.0-Flash agent whose instruction encodes the dataset schema, SQL rules, and language/typing guidance, and which drives a set of BigQuery function tools to complete each request end-to-end." },
			{ role: "Tools", title: "BigQuery function tools", body: "Python tools wrap the BigQuery client for schema fetch, table listing, query execution, sampling, and column stats. Execution is guarded to SELECT/WITH only, blocks mutating keywords, and caps bytes billed." },
			{ role: "Serving", title: "ADK API server + static UI", body: "The agent runs as a Dockerized adk api_server on Render; a static chat UI on Netlify calls its streaming endpoint directly and renders markdown tables." }
		],
		highlights: [
			{ title: "Self-correcting query loop", body: "On a query error the agent analyzes the failure, rewrites the SQL, and executes the corrected version automatically rather than surfacing a raw error." },
			{ title: "Read-only safety guard", body: "The execute tool only permits SELECT/WITH, blocks a comprehensive list of mutating keywords, and enforces a 10 GB maximum-bytes-billed limit." },
			{ title: "Bilingual data awareness", body: "Because the dataset stores each record in Latvian and English, the agent detects query language and always applies a language filter to avoid duplicate rows." },
			{ title: "Robust type handling", body: "Instructions and tooling account for string-typed dates and numeric fields, using SAFE_CAST/SAFE.PARSE and coercing values to JSON-safe types." }
		],
		stack: [
			{ group: "Agent & AI", items: ["Google ADK", "Gemini 2.0 Flash", "FunctionTool tool-calling"] },
			{ group: "Data", items: ["Google BigQuery", "pandas", "pyarrow"] },
			{ group: "Serving & UI", items: ["Docker + adk api_server (Render)", "Static chat UI (Netlify)", "SSE streaming"] }
		]
	},

	// --- Full-stack & web apps ---

	"calendar": {
		slug: "calendar",
		title: "Calendar App",
		tags: ["React", "Module Federation", "Firebase"],
		lede: "A scheduling and events calendar built as a Webpack Module Federation remote, backed by real-time Firestore sync.",
		live: "https://calendarmodule.netlify.app",
		source: "React-Calendar-module-federation",
		meta: { role: "Solo — full-stack", type: "Personal project", status: "Live" },
		overview: [
			"A calendar module for scheduling and managing events, built on the Schedule-X calendar library with week/day/month views, drag-and-drop event moving, resizing, and an event modal for create/edit. Events and calendars are stored in Cloud Firestore and stream back in real time, while per-calendar visibility toggles persist to localStorage.",
			"The app is packaged as a Webpack 5 Module Federation remote, so it can be dropped into a host shell as a micro-frontend and receives a userId prop for scoping data."
		],
		architecture: [
			{ role: "Front end", title: "React 18 remote via Module Federation", body: "React 18 UI split into header, sidebar, main grid and event modal, with calendar state managed through React Context. Exposed as a federated remote through Webpack's ModuleFederationPlugin with React shared as a singleton." },
			{ role: "Backend", title: "Firebase Firestore", body: "Cloud Firestore holds events and calendars; onSnapshot listeners keep the UI in sync in real time, with writes going straight back to the collections." }
		],
		highlights: [
			{ title: "Micro-frontend architecture", body: "Configured as a Webpack Module Federation remote exposing its App through a wrapper, designed to be consumed by a separate host application." },
			{ title: "Real-time event sync", body: "Firestore onSnapshot subscriptions push event and calendar changes to the UI live, rather than requiring manual refetches." },
			{ title: "Drag, drop and resize scheduling", body: "Uses Schedule-X drag-and-drop and resize plugins (15-minute granularity) for direct manipulation of events on the grid." }
		],
		stack: [
			{ group: "Front end", items: ["React 18", "Schedule-X calendar", "Tailwind CSS", "React Icons"] },
			{ group: "Build", items: ["Webpack 5", "Module Federation", "Babel"] },
			{ group: "Backend", items: ["Firebase Firestore"] }
		]
	},

	"firebase-chat": {
		slug: "firebase-chat",
		title: "Firebase Chat",
		tags: ["React", "TypeScript", "Firebase"],
		lede: "A reusable chat workspace component for React, with Firebase-backed messaging, an AI assistant panel, and a WebRTC calling UI.",
		live: "https://module-chat.netlify.app",
		source: "module-REACT-FIREBASE-CHAT-APP-POC",
		meta: { role: "Solo — full-stack", type: "Personal project", status: "Live" },
		overview: [
			"A chat workspace packaged as a distributable React component library (built with Vite). It provides conversations and channels, message cards with file previews and emoji, an AI assistant panel, and a WebRTC-based call UI, with authentication flows (email, Google sign-in, registration, onboarding) built on Firebase Auth, Firestore and Storage.",
			"The public Netlify build runs in an offline demo mode: Firebase is swapped for an in-memory implementation, every visitor is auto-signed in as an anonymous guest, contacts and a demo conversation are pre-seeded, and the AI panel answers from a small local responder — so no backend or API keys ship in the bundle."
		],
		architecture: [
			{ role: "Front end", title: "React + TypeScript component library", body: "React 18 / TypeScript workspace split into auth, layout, chat, AI and notification groups. Built as a library with Vite so it can be published and consumed as a package, and run standalone for development." },
			{ role: "Backend", title: "Firebase (Auth, Firestore, Storage)", body: "Firebase provides authentication, message/conversation storage and file uploads. A parallel in-memory demo backend implements the same interfaces for the public build, exercised by a demo-mode test that drives the real firebase modules against it." }
		],
		highlights: [
			{ title: "Swappable demo backend", body: "A demo-mode flag replaces Firebase Auth/Firestore/Storage with in-memory stand-ins so the app runs fully offline with seeded data and no shipped secrets — the same code paths are tested against both backends." },
			{ title: "AI assistant panel", body: "A dedicated AI panel integrates an AI responder, degrading to a small local responder in the demo build." },
			{ title: "WebRTC calling UI", body: "Includes call views, participant cards, incoming-call popups and a video player for a WebRTC calling experience layered onto the chat." }
		],
		stack: [
			{ group: "Front end", items: ["React 18", "TypeScript", "emoji-picker-react", "react-player", "date-fns"] },
			{ group: "Build", items: ["Vite (library build)", "Create React App"] },
			{ group: "Backend", items: ["Firebase Auth", "Firestore", "Firebase Storage"] }
		]
	},

	"bim-viewer": {
		slug: "bim-viewer",
		title: "BIM / 3D Viewer",
		tags: ["React", "Three.js", "IFC.js"],
		lede: "A browser-based BIM viewer that loads IFC and glTF building models, renders them in Three.js, and lets you inspect element properties by clicking.",
		live: "https://3dbuildingviewer.netlify.app",
		source: "bim-viewer",
		meta: { role: "Solo — front-end", type: "Personal project", status: "Live" },
		overview: [
			"A client-side 3D viewer for building/BIM models. It loads IFC files with web-ifc-three (IFC.js) and glTF/GLB models (with DRACO support), rendering them in a Three.js scene managed by a custom hook that handles camera, OrbitControls and auto-framing of loaded geometry.",
			"Clicking an element raycasts into the model to resolve its IFC expressID, highlights it with a translucent overlay, and shows its property sets in a side panel. A Material UI dark interface wraps a toolbar, model list, floor selector and camera controls, and a bundled sample house lets the app demo without an upload."
		],
		architecture: [],
		highlights: [
			{ title: "IFC parsing in the browser", body: "Uses web-ifc-three / IFC.js with the web-ifc WASM to parse IFC building models entirely client-side and extract structured element property sets." },
			{ title: "Raycast element selection", body: "Click events raycast to a face, resolve the IFC expressID, and build a highlighted subset overlay while fetching that element's properties for the side panel." },
			{ title: "Multi-format loading", body: "Supports both IFC and glTF/GLB (with DRACO decompression) in one Three.js scene." }
		],
		stack: [
			{ group: "Front end", items: ["React 19", "TypeScript", "Material UI", "Emotion"] },
			{ group: "3D / BIM", items: ["Three.js", "web-ifc-three (IFC.js)", "web-ifc (WASM)"] },
			{ group: "Build", items: ["Vite 7"] }
		]
	},

	"file-tree": {
		slug: "file-tree",
		title: "Interactive File Tree",
		tags: ["Vue 3", "TypeScript", "Pinia"],
		lede: "A Vue 3 file-tree component with drag-and-drop reorganisation, inline CRUD, live search and JSON import/export — all persisted client-side.",
		live: "https://interactive-file-tree-kristians.netlify.app",
		source: "interactive-file-tree",
		meta: { role: "Solo — front-end", type: "Personal project", status: "Live" },
		overview: [
			"An interactive, hierarchical file-tree UI built with Vue 3, TypeScript and Pinia. It renders expandable/collapsible folders through a recursive node component, and supports creating, renaming (inline via double-click, toolbar or F2) and deleting files and folders, with extension-based icons from Lucide.",
			"Nodes can be dragged into new folders, the tree can be filtered with live search that highlights matches and auto-expands ancestors, and the whole tree can be exported to / imported from JSON. Tree and view state auto-save to localStorage, with keyboard shortcuts and a persisted theme toggle."
		],
		architecture: [],
		highlights: [
			{ title: "Drag-and-drop reorganisation", body: "A dedicated composable implements moving files and folders between locations by dragging, with the recursive node component re-rendering the reorganised tree." },
			{ title: "Live search with ancestor expansion", body: "Typing filters the tree in place, highlighting matching nodes and automatically expanding their parent folders so matches stay visible." },
			{ title: "JSON round-trip + auto-save", body: "The tree exports to and re-imports from JSON, and both tree and view state persist to localStorage so a session is restored on reload." }
		],
		stack: [
			{ group: "Front end", items: ["Vue 3 (Composition API)", "TypeScript", "Pinia", "Lucide icons"] },
			{ group: "Build", items: ["Vite 5"] }
		]
	},

	"markdown-preview": {
		slug: "markdown-preview",
		title: "Markdown Preview",
		tags: ["Vue 3", "TypeScript", "Vite"],
		lede: "A fast, fully client-side Markdown editor with live side-by-side preview, syntax highlighting and safe HTML rendering.",
		live: "https://markdown-preview-kristians.netlify.app",
		source: "markdown-preview",
		meta: { role: "Solo — front-end", type: "Personal project", status: "Live" },
		overview: [
			"A browser-based Markdown editor with a live, side-by-side preview built in Vue 3, TypeScript and Vite. Markdown is parsed with marked (GitHub-flavoured), code blocks are highlighted with highlight.js, and rendered HTML is sanitised with DOMPurify to prevent XSS from pasted content. Everything runs client-side with no backend.",
			"Logic is organised into composables (parsing, theming, document stats, export) keeping components focused on rendering. It offers a draggable split pane, auto-save to localStorage, light/dark theming, live word/character counts with reading time, and export to .md or a self-contained .html file."
		],
		architecture: [],
		highlights: [
			{ title: "Sanitised live rendering", body: "Rendered HTML is passed through DOMPurify before display, guarding against XSS from pasted or authored Markdown while still updating on every keystroke." },
			{ title: "Composable-based architecture", body: "Parsing/auto-save, theming, document statistics and export are each isolated in their own composable, so components stay presentational." },
			{ title: "Self-contained HTML export", body: "Documents export as a standalone .html file with inline styles and an embedded highlight theme, so the output renders anywhere without the app." }
		],
		stack: [
			{ group: "Front end", items: ["Vue 3 (script setup)", "TypeScript", "marked", "highlight.js", "DOMPurify", "@vueuse/core"] },
			{ group: "Build", items: ["Vite 5"] }
		]
	},

	"animal-adoption": {
		slug: "animal-adoption",
		title: "Animal Adoption",
		tags: ["Vue 2", "Vuex", "Bootstrap-Vue"],
		lede: "An early Vue 2 practice app for browsing adoptable cats and dogs and adding new pets, with state managed in Vuex.",
		live: "https://admiring-panini-741142.netlify.app",
		source: "AnimalAdoption",
		meta: { role: "Solo — front-end", type: "Personal project", status: "Live" },
		overview: [
			"A small pet-adoption practice app built with Vue 2, Vue Router and Vuex. A home view shows running totals of animals, cats and dogs and offers a Bootstrap-Vue form to add a new pet. Separate Cats and Dogs views list adoptable pets in tables, and a detail view shows an individual animal.",
			"Pet data starts from bundled seed lists and is held in a Vuex store; styling uses Bootstrap 4 with Bootstrap-Vue components and Sass. It's a focused learning project demonstrating Vue's core patterns rather than a backed application."
		],
		architecture: [],
		highlights: [
			{ title: "Vuex state management", body: "Animal data and derived counts flow through a classic Vuex store with getters, mutations and actions wiring the add-pet form to the lists." }
		],
		stack: [
			{ group: "Front end", items: ["Vue 2", "Vue Router", "Vuex", "Bootstrap-Vue", "Sass"] },
			{ group: "Build", items: ["Vue CLI"] }
		]
	},

	// --- Client / production work (from repos) ---

	"salons-arka": {
		slug: "salons-arka",
		title: "Salons Arka",
		tags: ["Client", "E-commerce", "PHP"],
		lede: "A large custom-built PHP/MySQL e-commerce platform for a Latvian furniture supplier, with a bespoke admin panel, multilingual catalog and integrated card payments.",
		live: "https://export.salonsarka.lv",
		source: "",
		meta: { role: "Freelance — full-stack", type: "Client project", status: "Live in production" },
		overview: [
			"Salons Arka is a production e-commerce site built from scratch in plain PHP on a MySQL/MariaDB database of roughly 62 tables. It covers the full storefront — product catalog with categories, subcategories, collections and configurable products, cart and checkout, customer accounts, blog, project references and equipment rental — served bilingually in Latvian and English.",
			"The whole site is content-managed through a custom-written admin panel rather than an off-the-shelf CMS, giving the client control over products, pricing, media, menus, SEO and orders without touching code."
		],
		architecture: [
			{ role: "Front end", title: "Server-rendered PHP storefront", body: "Page templates in PHP with shared includes, jQuery-driven interactions, and .htaccess-based clean URLs. Every user-facing string is served per-language (LV/EN) from content tables." },
			{ role: "Back end", title: "Custom admin panel + MySQL", body: "A hand-built admin area manages products, categories, collections, blog, FAQs, team, projects, rentals, shipping, promo codes, redirects and SEO. Data lives across ~62 MySQL tables; media is offloaded to a dedicated file server." },
			{ role: "Payments & docs", title: "EveryPay + PDF generation", body: "Card checkout is integrated with the EveryPay gateway including a 3-D Secure account and a server-side callback. Order invoices and a downloadable PDF catalogue are generated with TCPDF; transactional email goes through PHPMailer." }
		],
		highlights: [
			{ title: "Bespoke CMS/admin", body: "No WordPress or Magento — a purpose-written PHP admin panel drives the entire catalog, content, menus and SEO metadata, tailored to the client's product structure." },
			{ title: "Configurable products with 3D downloads", body: "Products support configuration groups and let customers download a 3D file of their selected configuration, backed by dedicated configuration and 3D-product tables." },
			{ title: "Card payments with 3-D Secure", body: "Checkout talks to the EveryPay gateway with a 3DS account and a server-side confirmation callback, so real orders are captured and reconciled in production." },
			{ title: "Bilingual storefront & SEO", body: "Full LV/EN localization with per-page localized links, dedicated SEO tables, managed redirects and generated sitemaps." }
		],
		stack: [
			{ group: "Back end", items: ["PHP", "MySQL / MariaDB", "Custom admin panel"] },
			{ group: "Front end", items: ["Server-rendered PHP templates", "jQuery", "HTML/CSS"] },
			{ group: "Integrations", items: ["EveryPay (card payments + 3DS)", "TCPDF", "PHPMailer"] }
		]
	},

	"atsledznieks": {
		slug: "atsledznieks",
		title: "Atslēdznieks",
		tags: ["Client", "Next.js", "TypeScript"],
		lede: "A modern, trilingual marketing and service-catalog site for a Latvian locksmith and security company, built with Next.js and TypeScript.",
		live: "https://atsledznieks.lv",
		source: "",
		meta: { role: "Freelance — full-stack", type: "Client project", status: "Live in production" },
		overview: [
			"Atslēdznieks is the web presence for a locksmith and security-systems business, presenting its services — lock opening and installation, alarm systems, CCTV, access control and safes — alongside a filterable product catalog. It is built on Next.js 14 with the App Router and TypeScript, organized into around 40 reusable React components.",
			"The site is fully localized in three languages (Latvian by default, plus English and Russian) using next-intl, with locale-aware routing and per-page SEO metadata."
		],
		architecture: [
			{ role: "Front end", title: "Next.js 14 App Router + React 18", body: "A component-driven UI (hero, service sections, catalog filters, FAQ) written in TypeScript with CSS Modules and Tailwind CSS. SVGs are inlined with react-inlinesvg and utility logic uses ramda and clsx." },
			{ role: "Localization & SEO", title: "next-intl i18n and metadata", body: "Locale-prefixed routes for EN/LV/RU with a LV default, driven by middleware and per-route message files. Each page ships its own metadata with generated language alternates for search engines." }
		],
		highlights: [
			{ title: "Trilingual by design", body: "Latvian, English and Russian are handled through next-intl with dedicated message catalogs, locale routing and translated metadata — not an afterthought bolt-on." },
			{ title: "Service + catalog structure", body: "Dedicated sections for each security service plus a catalog with category filters and dynamic per-product pages." },
			{ title: "Component-driven, typed codebase", body: "Around 40 modular TypeScript React components with CSS Modules, giving a maintainable, consistent design system across desktop and mobile." },
			{ title: "SEO-ready metadata", body: "Per-route metadata and generated hreflang alternates help each localized page surface correctly in search." }
		],
		stack: [
			{ group: "Framework", items: ["Next.js 14 (App Router)", "React 18", "TypeScript"] },
			{ group: "Styling", items: ["Tailwind CSS", "CSS Modules"] },
			{ group: "Libraries", items: ["next-intl (i18n)", "ramda", "clsx", "react-inlinesvg"] }
		]
	},

	"elements": {
		slug: "elements",
		title: "Elements",
		tags: ["Client", "Front-end", "Static"],
		lede: "A visually rich one-page marketing site for an environmental-technology company, built as a lightweight static site with parallax effects and client-side multilingual support.",
		live: "https://elementsincwebsite.netlify.app",
		source: "",
		meta: { role: "Freelance — front-end", type: "Client project", status: "Live in production" },
		overview: [
			"Elements is a single-page promotional website for Elements Inc, a company working in wastewater treatment and environmental technology, with sections on water purification, green logistics and drone-assisted operations. It is deployed as a static site on Netlify.",
			"The page leans on motion and imagery — parallax scrolling, background video and fading image slideshows — to present the brand, kept fast and dependency-light with vanilla JavaScript."
		],
		architecture: [
			{ role: "Front end", title: "Static HTML/CSS with vanilla JS", body: "A hand-built single-page layout styled with custom CSS. Parallax is driven by Rellax.js and simpleParallax, with custom vanilla-JS slideshows and autoplaying background video." },
			{ role: "Localization", title: "Client-side i18n", body: "Bilingual content (English and Polish) is swapped entirely on the client using data-i18n attributes and a JavaScript translation dictionary, with the chosen language persisted in localStorage." }
		],
		highlights: [
			{ title: "Motion-driven presentation", body: "Rellax and simpleParallax power layered parallax scrolling, combined with background video and custom cross-fading image slideshows." },
			{ title: "Client-side multilingual switching", body: "A lightweight data-i18n system replaces page text on the fly between English and Polish and remembers the visitor's choice via localStorage — no reloads or backend." },
			{ title: "Lean, fast static delivery", body: "Deployed on Netlify as a static site with essentially a single small dependency, keeping the page quick to load and cheap to host." }
		],
		stack: [
			{ group: "Front end", items: ["HTML5", "CSS3", "Vanilla JavaScript"] },
			{ group: "Libraries", items: ["Rellax.js", "simpleParallax.js"] },
			{ group: "Hosting", items: ["Netlify (static)"] }
		]
	},

	// --- Client / production work without a public repo (kept brief & honest) ---

	"reltek": {
		slug: "reltek",
		title: "Reltek",
		tags: ["Client", "E-commerce"],
		lede: "An online store I built and maintain as part of my freelance client work.",
		live: "https://reltek.lv",
		source: "",
		meta: { role: "Freelance — full-stack", type: "Client project", status: "Live in production" },
		overview: [
			"A production e-commerce site delivering the storefront, product management, and day-to-day maintenance for a real business."
		],
		stack: [
			{ group: "Build", items: ["PHP", "MySQL", "JavaScript", "HTML/CSS"] }
		]
	},

	"kp-pro": {
		slug: "kp-pro",
		title: "KP Pro",
		tags: ["Client", "Web"],
		lede: "A business website delivered as freelance client work.",
		live: "http://kppro.lv",
		source: "",
		meta: { role: "Freelance — full-stack", type: "Client project", status: "Live in production" },
		overview: [
			"A production website built for a client — front-end delivery plus the back-end and content wiring to keep it running."
		],
		stack: [
			{ group: "Build", items: ["PHP", "MySQL", "JavaScript", "HTML/CSS"] }
		]
	},

	// --- Fundamentals & practice (repo-less; intentionally short) ---

	"algorithm-viz": {
		slug: "algorithm-viz",
		title: "Algorithm Visualization",
		tags: ["Algorithms", "Visualization", "Bachelor's"],
		lede: "An interactive tool that animates how algorithms work, built as my bachelor's project.",
		live: "https://algoritmuvizualizacijasriks.netlify.app",
		source: "bakalaurs",
		meta: { role: "Solo — front-end", type: "Academic project", status: "Live" },
		overview: [
			"A visualizer that steps through algorithms visually so their behavior is easy to follow — built to make abstract logic tangible."
		],
		stack: [{ group: "Build", items: ["JavaScript", "HTML/CSS"] }]
	},

	"currency-selector": {
		slug: "currency-selector",
		title: "Currency Selector",
		tags: ["UI", "Front-end"],
		lede: "A focused UI component for selecting currencies, built as a front-end practice piece.",
		live: "https://currencyselectiondemo.netlify.app",
		source: "CurrencySelectionDemo",
		meta: { role: "Solo — front-end", type: "Practice project", status: "Live" },
		overview: [
			"A small, self-contained demo concentrating on a single interactive control done well."
		],
		stack: [{ group: "Build", items: ["JavaScript", "HTML/CSS"] }]
	},

	"flex-grid": {
		slug: "flex-grid",
		title: "Flex & Grid Cheatsheet",
		tags: ["CSS", "Reference"],
		lede: "An interactive cheatsheet for CSS Flexbox and Grid, built to make the layout properties click.",
		live: "https://flexgridcheatsheet.netlify.app",
		source: "Flex-Grid-Cheat-Sheet",
		meta: { role: "Solo — front-end", type: "Practice project", status: "Live" },
		overview: [
			"A visual reference that lets you toggle Flexbox and Grid properties and watch the layout respond in real time."
		],
		stack: [{ group: "Build", items: ["HTML", "CSS", "JavaScript"] }]
	},

	"week-student": {
		slug: "week-student",
		title: "Week for a student",
		tags: ["Web design", "CSS"],
		lede: "A responsive web-design exercise laying out a student's week.",
		live: "https://webdesign.netlify.app",
		source: "WeekAsStudent",
		meta: { role: "Solo — front-end", type: "Practice project", status: "Live" },
		overview: [
			"An early web-design piece focused on clean, responsive layout and typography."
		],
		stack: [{ group: "Build", items: ["HTML", "CSS"] }]
	},

	"snake": {
		slug: "snake",
		title: "The Snake game",
		tags: ["Game", "JavaScript"],
		lede: "The classic Snake game, built to practice the game loop and canvas rendering.",
		live: "https://upbeat-ptolemy-8e8db8.netlify.app",
		source: "Snake-game",
		meta: { role: "Solo — front-end", type: "Practice project", status: "Live" },
		overview: [
			"A from-scratch take on Snake — input handling, a running game loop, collision detection, and scoring."
		],
		stack: [{ group: "Build", items: ["JavaScript", "HTML5 Canvas"] }]
	},

	"tic-tac-toe": {
		slug: "tic-tac-toe",
		title: "Tic, tac, toe game",
		tags: ["Game", "JavaScript"],
		lede: "Tic-tac-toe with win detection, built to practice state and game logic.",
		live: "https://elastic-goldwasser-559708.netlify.app",
		source: "Tic-Tac-Toe-Game",
		meta: { role: "Solo — front-end", type: "Practice project", status: "Live" },
		overview: [
			"A small two-player game handling board state, turn logic, and win/draw detection."
		],
		stack: [{ group: "Build", items: ["JavaScript", "HTML/CSS"] }]
	},

	"chip-dice": {
		slug: "chip-dice",
		title: "Chip & Dice game demo",
		tags: ["Game", "JavaScript"],
		lede: "A dice-and-chips game demo built as a front-end practice piece.",
		live: "https://chipanddicegame.netlify.app",
		source: "dice-chip-game",
		meta: { role: "Solo — front-end", type: "Practice project", status: "Live" },
		overview: [
			"A browser game exercise covering game state, randomness, and turn-based rules."
		],
		stack: [{ group: "Build", items: ["JavaScript", "HTML/CSS"] }]
	}
};

export default caseStudies;
