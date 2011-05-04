// Editor specific functions

function bodyLoad(version) {
	if (history.state !== undefined) {
		onpopstate(history);
	}
}

function whisperClick(event, field) {
	var el = event.target || event.srcElement;
	if (/^a$/i.test(el.tagName) && !(event.button || event.ctrlKey || event.shiftKey || event.altKey || event.metaKey)) {
		field.value = el.firstChild.data;
		field.previousSibling.value = decodeURIComponent(el.href.replace(/.*=/, ''));
		field.nextSibling.style.display = 'none';
		eventStop(event);
		return false;
	}
}

function whisper(url, field) {
	if (field.orig != field.value) {
		field.orig = field.value;
		return ajax(url + encodeURIComponent(field.value), function (xmlhttp) {
			if (xmlhttp.status && field.orig == field.value) {
				field.nextSibling.innerHTML = xmlhttp.responseText;
				field.nextSibling.style.display = '';
				var a = field.nextSibling.firstChild;
				if (a && a.firstChild.data == field.value) {
					field.previousSibling.value = decodeURIComponent(a.href.replace(/.*=/, ''));
					a.style.fontWeight = 'bold';
				}
			}
		});
	}
}
