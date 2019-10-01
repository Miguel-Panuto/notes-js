const fs = require('fs');
const chalk = require('chalk')


const addNote = (title, body) =>
{
    const notes = loadNotes();
    const duplicateNote = notes.find ((note) => note.title === title);

    if (!duplicateNote)
    {
        notes.push(
            {
                title:title,
                body: body
            });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'))
    }
    else 
    {
        console.log(chalk.red.inverse('Note title teken!'));
    }
}

const removeNote = (title) =>
{
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    saveNotes(notesToKeep);
    if (notesToKeep.length < notes.length)
        console.log(chalk.green.inverse('Note removed!'));
    else
        console.log(chalk.red.inverse('No note found!'));
}

const listNotes = () =>
{
    const notes = loadNotes();
    if (notes.length === 0)
    {
        console.log(chalk.inverse.red('Empty list'));
        return;
    }
    console.log(chalk.inverse('Your notes: '))
    notes.forEach((note) => console.log(note.title));
}

const readNote = (title) =>
{
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);
    if (noteToRead)
    {
        console.log(chalk.inverse(noteToRead.title));
        console.log(noteToRead.body);
    }
    else
        console.log(chalk.inverse.red("Error: note title not founded"));
}

const saveNotes = (notes) =>
{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () =>
{
    try
    {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e)
    {
        return [];
    }
}

module.exports = 
{
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}