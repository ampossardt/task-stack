function arrangeNotes(collection) {
	var notes = collection || getElementsAsStack();
	var count = notes.length;
	
	for(var i=0; i < count; i++) {
		cascadeElement(notes.pop(), i);
	}
}

function setupListeners() {
	setupNoteSpecificListeners();
	setupGenericListeners();
	setupHoverAnimations();
}

function setupNoteSpecificListeners() {
	var approve = document.getElementById('note-approve');
	var remove = document.getElementById('note-remove');
	
	approve.addEventListener('click', event => {
		var active = getActiveNote();
		removeNote(active);
	});
	
	remove.addEventListener('click', event => {
		var active = getActiveNote();
		removeNote(active);
	});
}

function setupGenericListeners() {
	var add = document.getElementById('note-add');
	var show = document.getElementById('note-show');
	var addAlternate = document.getElementById('note-add-alternate');
	
	add.addEventListener('click', event => {
		addNote();
	});
	
	addAlternate.addEventListener('click', event => {
		addNote();
	});
	
	show.addEventListener('click', event => {
		var mainContainer = getMainContainer();
		var showGrid = !mainContainer.classList.contains('arrange');
		
		toggleClass(getMainContainer(), 'arrange');
		toggleClass(show, 'active');
		
		if(showGrid) {
			arrangeNotesAsGrid();
		} else {
			arrangeNotes();
		}
	});
}

function setupHoverAnimations() {
	var mainContainer = getMainContainer();
	var toolbar = document.getElementById('toolbar');
	
	mainContainer.addEventListener('mouseover', event => {
		addClass(toolbar, 'active');
	});
	mainContainer.addEventListener('mouseout', event => {
		removeClass(toolbar, 'active');
	});
}

function removeNote(activeNote) {
	var notes = getElementsAsStack();
	
	hideNote(activeNote);
	notes.pop();
	
	if(!notes.length) {
		addClass(getMainContainer(), 'empty');
	} else {
		addClass(getLast(notes), 'note-active');
		arrangeNotes(notes);
	}
}

function addNote() {
	var notes = getElementsAsStack();
	
	if(!notes.length) {
		removeClass(getMainContainer(), 'empty');
	} else {
		removeClass(notes, 'note-active')
	}
	
	notes.push(createNote());
	arrangeNotes(notes);
}

function createNote() {
	var note = document.createElement("div");
	addClass(note, "note");
	addClass(note, "note-active");
	note.appendChild(document.createElement("textarea"));
	prepend(getMainContainer(), note);
	return note;
}

function ready() {
	arrangeNotes();
	setupListeners();
}

window.onload = ready;

// Utility Functions Specific to this app

function getElementsAsStack(collection) {
	var elements = collection || document.getElementsByClassName('note');
	var stack = [];
	
	for(var i = elements.length - 1; i >= 0; i--) {
		stack.push(elements[i]);
	}
	
	return stack;
}

function getMainContainer() {
	return document.getElementsByClassName('main-container')[0];
}

function getActiveNote() {
	return document.querySelectorAll('.note-active')[0];
}

function hideNote(note) {
	addClass(note, 'hide');
	note.style.left = note.style.top = -50;
	setTimeout(() => { removeElement(note); }, 500);
}

function arrangeNotesAsGrid() {
	var notes = getElementsAsStack();
	var row = 1;
	var colSize = ((window.outerWidth * .75) / 3) - 10;
	var count = notes.length;
	
	for(var i = 0; i < count; i++) {
		var column = (i % 3) + 1;
		var current = notes.pop();
		
		current.style.top = (row * 305) - 305;
		current.style.left = (column * (colSize + 5)) - (colSize + 5);  
		
		if(column === 3) row++;
	}
}