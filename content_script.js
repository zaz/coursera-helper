const blacklist = [ "redact", "fuck", "cunt", "nigger", "whore", "bitch", "arsehole" ]
const blackRegExp = new RegExp( blacklist.join("|"), "i")
const replacement = "█████"

const separator = $("<span>").text(" ⋅ ")
const redact_button = $("<button>", {class: "redact", html: $("<span>").text("Redact")})
const base_element = ".rc-DetailedQuestion"
const element_to_add_button_to = ".action-area"


// String.prototype.redact = function() { return this.replace(/redact|fuck|cunt|nigger|whore|bitch|arsehole/i, "█████") }
const redact = text => text.replace(blackRegExp, replacement)

const make_change = () => {
	post_text = $(".scribe-editor[contenteditable=true]")
	post_text.html( redact(post_text.html()) )
}
const submit_change = () => {
	$(".rc-EditThreadForm button[type=submit]").click()
}

const add_button = () => {
	our_element = $(base_element + " " + element_to_add_button_to)
	if ( our_element.length == 0 )
		return setTimeout(add_button, 500)
	console.log( our_element )
	// console.log($(".rc-DetailedQuestion"))
	// console.log(this)
	$(".action-area").first().append(separator).append(redact_button)
		.click(make_change.bind(this))  // make change with self bound here XXX
	// console.log( $(".action-area") )
}

$( () => {
	// mo = new MutationObserver( mutation => {
	// 	console.log( "mutation" )
	// 	if (!mutation.addedNodes) return
	// 	console.log(mutation.addedNodes)
	// 	mutation.addedNodes.forEach( node => {
	// 		if (!$(node).is(base_element + " " + element_to_add_button_to)) return
	// 		console.log( node )
	// 		base = node.closest(base_element)
	// 		console.log( base )
	// 		node.append(separator).append(redact_button)
	// 			.click(make_change.bind(base))  // make change with self bound here XXX
	// 		})
	// })
	// mo.observe(document, {childList: true, subtree: true})
	console.log("setting timeout")
	setTimeout(add_button, 500)
})

$(document).on("ready", ".rc-DetailedQuestion", () => {
})
