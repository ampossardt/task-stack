function cascadeElement(element, i) {
	element.style.left = i * 10;
	element.style.top = i * 10;
	element.style["z-index"] = -i;
}

function getLast(collection) {
	return collection[collection.length - 1];
}

function getLastPosition(collection) {
	var last = getLast(collection);
	return last.style.left || 0;
}

function getPosition(element) {
	return parseInt(element.style.left) || 0;
}

function addClass(el, className) {
	if(el.length && el.length >= 1) {
		for(var i=0; i < el.length; i++) {
			if (el[i].classList)
				el[i].classList.add(className);
			else
				el[i].className += ' ' + className;
		}
	} else {
		if (el.classList)
			el.classList.add(className);
		else
			el.className += ' ' + className;

	}
}

function removeClass(el, className) {
	if(el.length && el.length >= 1) {
		for(var i=0; i < el.length; i++) {
			if (el[i].classList)
				el[i].classList.remove(className);
			else
				el[i].className = el[i].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	} else {
		if (el.classList)
			el.classList.remove(className);
		else
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}

function toggleClass(el, className) {
	if (el.classList) {
	  el.classList.toggle(className);
	} else {
	  var classes = el.className.split(' ');
	  var existingIndex = classes.indexOf(className);

	  if (existingIndex >= 0)
		classes.splice(existingIndex, 1);
	  else
		classes.push(className);

	  el.className = classes.join(' ');
	}
}

function removeElement(el) {
	el.parentElement.removeChild(el);
}

function prepend(parent, el) {
	parent.insertBefore(el, parent.firstChild);
}