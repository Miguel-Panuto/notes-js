const chalk = require('chalk')
const yargs = require('yargs');
const note = require('./notes.js');

yargs.version('1.1.0');

//Create add command
yargs.command(
{
    command: 'add',
    describe: 'Add a new note',
    builder:
    {
        title:
        {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:
        {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv)
    {
        note.addNote(argv.title, argv.body);
    }        
});

//Create remove command
yargs.command(
{
    command: 'remove',
    describe: 'Remove a note',
    builder:
    {
        title: 
        {
            describe: 'Note tile',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv)
    {
        note.removeNote(argv.title)
    }
});

//Create read command
yargs.command(
{
    command: 'read',
    describe: 'Reads a note',
    builder:
    {
        title:
        {
            describe: 'The note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv)
    {
        note.readNote(argv.title);
    }
});

//Create list command
yargs.command(
{
    command: 'list',
    describe: 'List the notes',
    handler()
    {
        note.listNotes();
    }
});

yargs.parse();