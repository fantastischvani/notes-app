const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Add Note button click
addBtn.addEventListener("click", () => {
    addNote();
});

// Save notes to localStorage
const saveNotes = () => {
    const notes = document.querySelectorAll(".note .content");
    const titles = document.querySelectorAll(".note .title");

    const data = [];

    notes.forEach((note, index) => {
        const content = note.value;
        const title = titles[index].value;
        if (content.trim() !== "") {
            data.push({ title, content });
        }
    });

    const titlesData = data.map(item => item.title);
    const contentData = data.map(item => item.content);

    localStorage.setItem("titles", JSON.stringify(titlesData));
    localStorage.setItem("notes", JSON.stringify(contentData));
};

// Create and add a new note
const addNote = (text = "", title = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="icons">
            <i class="save fas fa-save" style="color:red"></i>
            <i class="trash fas fa-trash" style="color:yellow"></i>
        </div>
        <div class="title-div">
            <textarea class="title" placeholder="Write the title ...">${title}</textarea>
        </div>
        <textarea class="content" placeholder="Note down your thoughts ...">${text}</textarea>
    `;

    // Delete note
    note.querySelector(".trash").addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    // Save note
    note.querySelector(".save").addEventListener("click", () => {
        saveNotes();
    });

    main.appendChild(note);
    saveNotes();
};

// Load saved notes on page load
const loadNotes = () => {
    const titlesData = JSON.parse(localStorage.getItem("titles")) || [];
    const contentData = JSON.parse(localStorage.getItem("notes")) || [];

    for (let i = 0; i < Math.max(titlesData.length, contentData.length); i++) {
        addNote(contentData[i], titlesData[i]);
    }
};

loadNotes();
