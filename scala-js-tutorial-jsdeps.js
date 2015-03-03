/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/**
 * PV - WebGL protein viewer v1.4.0
 * http://biasmv.github.io/pv
 * 
 * Copyright 2013-2015 Marco Biasini
 * Released under the MIT license
 */
!function(a,b){if("function"==typeof define&&define.amd)define([],b);else{var c=b();a.pv=c,a.io=c.io,a.mol=c.mol,a.color=c.color,a.rgb=c.rgb,a.viewpoint=c.viewpoint,a.vec3=c.vec3,a.vec4=c.vec4,a.mat3=c.mat3,a.mat4=c.mat4,a.quat=c.quat}}(this,function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q;return a=function(){var a={};if(!b)var b=1e-6;if(!c)var c="undefined"!=typeof Float32Array?Float32Array:Array;if(!d)var d=Math.random;var e={};e.setMatrixArrayType=function(a){c=a},a.glMatrix=e;var f={};f.create=function(){var a=new c(3);return a[0]=0,a[1]=0,a[2]=0,a},f.clone=function(a){var b=new c(3);return b[0]=a[0],b[1]=a[1],b[2]=a[2],b},f.fromValues=function(a,b,d){var e=new c(3);return e[0]=a,e[1]=b,e[2]=d,e},f.copy=function(a,b){return a[0]=b[0],a[1]=b[1],a[2]=b[2],a},f.set=function(a,b,c,d){return a[0]=b,a[1]=c,a[2]=d,a},f.add=function(a,b,c){return a[0]=b[0]+c[0],a[1]=b[1]+c[1],a[2]=b[2]+c[2],a},f.subtract=function(a,b,c){return a[0]=b[0]-c[0],a[1]=b[1]-c[1],a[2]=b[2]-c[2],a},f.sub=f.subtract,f.multiply=function(a,b,c){return a[0]=b[0]*c[0],a[1]=b[1]*c[1],a[2]=b[2]*c[2],a},f.mul=f.multiply,f.divide=function(a,b,c){return a[0]=b[0]/c[0],a[1]=b[1]/c[1],a[2]=b[2]/c[2],a},f.div=f.divide,f.min=function(a,b,c){return a[0]=Math.min(b[0],c[0]),a[1]=Math.min(b[1],c[1]),a[2]=Math.min(b[2],c[2]),a},f.max=function(a,b,c){return a[0]=Math.max(b[0],c[0]),a[1]=Math.max(b[1],c[1]),a[2]=Math.max(b[2],c[2]),a},f.scale=function(a,b,c){return a[0]=b[0]*c,a[1]=b[1]*c,a[2]=b[2]*c,a},f.scaleAndAdd=function(a,b,c,d){return a[0]=b[0]+c[0]*d,a[1]=b[1]+c[1]*d,a[2]=b[2]+c[2]*d,a},f.distance=function(a,b){var c=b[0]-a[0],d=b[1]-a[1],e=b[2]-a[2];return Math.sqrt(c*c+d*d+e*e)},f.dist=f.distance,f.squaredDistance=function(a,b){var c=b[0]-a[0],d=b[1]-a[1],e=b[2]-a[2];return c*c+d*d+e*e},f.sqrDist=f.squaredDistance,f.length=function(a){var b=a[0],c=a[1],d=a[2];return Math.sqrt(b*b+c*c+d*d)},f.len=f.length,f.squaredLength=function(a){var b=a[0],c=a[1],d=a[2];return b*b+c*c+d*d},f.sqrLen=f.squaredLength,f.negate=function(a,b){return a[0]=-b[0],a[1]=-b[1],a[2]=-b[2],a},f.normalize=function(a,b){var c=b[0],d=b[1],e=b[2],f=c*c+d*d+e*e;return f>0&&(f=1/Math.sqrt(f),a[0]=b[0]*f,a[1]=b[1]*f,a[2]=b[2]*f),a},f.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]},f.cross=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=c[0],h=c[1],i=c[2];return a[0]=e*i-f*h,a[1]=f*g-d*i,a[2]=d*h-e*g,a},f.lerp=function(a,b,c,d){var e=b[0],f=b[1],g=b[2];return a[0]=e+d*(c[0]-e),a[1]=f+d*(c[1]-f),a[2]=g+d*(c[2]-g),a},f.random=function(a,b){b=b||1;var c=2*d()*Math.PI,e=2*d()-1,f=Math.sqrt(1-e*e)*b;return a[0]=Math.cos(c)*f,a[1]=Math.sin(c)*f,a[2]=e*b,a},f.transformMat4=function(a,b,c){var d=b[0],e=b[1],f=b[2];return a[0]=c[0]*d+c[4]*e+c[8]*f+c[12],a[1]=c[1]*d+c[5]*e+c[9]*f+c[13],a[2]=c[2]*d+c[6]*e+c[10]*f+c[14],a},f.transformMat3=function(a,b,c){var d=b[0],e=b[1],f=b[2];return a[0]=d*c[0]+e*c[3]+f*c[6],a[1]=d*c[1]+e*c[4]+f*c[7],a[2]=d*c[2]+e*c[5]+f*c[8],a},f.transformQuat=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=c[0],h=c[1],i=c[2],j=c[3],k=j*d+h*f-i*e,l=j*e+i*d-g*f,m=j*f+g*e-h*d,n=-g*d-h*e-i*f;return a[0]=k*j+n*-g+l*-i-m*-h,a[1]=l*j+n*-h+m*-g-k*-i,a[2]=m*j+n*-i+k*-h-l*-g,a},f.forEach=function(){var a=f.create();return function(b,c,d,e,f,g){var h,i;for(c||(c=3),d||(d=0),i=e?Math.min(e*c+d,b.length):b.length,h=d;i>h;h+=c)a[0]=b[h],a[1]=b[h+1],a[2]=b[h+2],f(a,a,g),b[h]=a[0],b[h+1]=a[1],b[h+2]=a[2];return b}}(),f.str=function(a){return"vec3("+a[0]+", "+a[1]+", "+a[2]+")"},a.vec3=f;var g={};g.create=function(){var a=new c(4);return a[0]=0,a[1]=0,a[2]=0,a[3]=0,a},g.clone=function(a){var b=new c(4);return b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b},g.fromValues=function(a,b,d,e){var f=new c(4);return f[0]=a,f[1]=b,f[2]=d,f[3]=e,f},g.copy=function(a,b){return a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],a},g.set=function(a,b,c,d,e){return a[0]=b,a[1]=c,a[2]=d,a[3]=e,a},g.add=function(a,b,c){return a[0]=b[0]+c[0],a[1]=b[1]+c[1],a[2]=b[2]+c[2],a[3]=b[3]+c[3],a},g.subtract=function(a,b,c){return a[0]=b[0]-c[0],a[1]=b[1]-c[1],a[2]=b[2]-c[2],a[3]=b[3]-c[3],a},g.sub=g.subtract,g.multiply=function(a,b,c){return a[0]=b[0]*c[0],a[1]=b[1]*c[1],a[2]=b[2]*c[2],a[3]=b[3]*c[3],a},g.mul=g.multiply,g.divide=function(a,b,c){return a[0]=b[0]/c[0],a[1]=b[1]/c[1],a[2]=b[2]/c[2],a[3]=b[3]/c[3],a},g.div=g.divide,g.min=function(a,b,c){return a[0]=Math.min(b[0],c[0]),a[1]=Math.min(b[1],c[1]),a[2]=Math.min(b[2],c[2]),a[3]=Math.min(b[3],c[3]),a},g.max=function(a,b,c){return a[0]=Math.max(b[0],c[0]),a[1]=Math.max(b[1],c[1]),a[2]=Math.max(b[2],c[2]),a[3]=Math.max(b[3],c[3]),a},g.scale=function(a,b,c){return a[0]=b[0]*c,a[1]=b[1]*c,a[2]=b[2]*c,a[3]=b[3]*c,a},g.scaleAndAdd=function(a,b,c,d){return a[0]=b[0]+c[0]*d,a[1]=b[1]+c[1]*d,a[2]=b[2]+c[2]*d,a[3]=b[3]+c[3]*d,a},g.distance=function(a,b){var c=b[0]-a[0],d=b[1]-a[1],e=b[2]-a[2],f=b[3]-a[3];return Math.sqrt(c*c+d*d+e*e+f*f)},g.dist=g.distance,g.squaredDistance=function(a,b){var c=b[0]-a[0],d=b[1]-a[1],e=b[2]-a[2],f=b[3]-a[3];return c*c+d*d+e*e+f*f},g.sqrDist=g.squaredDistance,g.length=function(a){var b=a[0],c=a[1],d=a[2],e=a[3];return Math.sqrt(b*b+c*c+d*d+e*e)},g.len=g.length,g.squaredLength=function(a){var b=a[0],c=a[1],d=a[2],e=a[3];return b*b+c*c+d*d+e*e},g.sqrLen=g.squaredLength,g.negate=function(a,b){return a[0]=-b[0],a[1]=-b[1],a[2]=-b[2],a[3]=-b[3],a},g.normalize=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=c*c+d*d+e*e+f*f;return g>0&&(g=1/Math.sqrt(g),a[0]=b[0]*g,a[1]=b[1]*g,a[2]=b[2]*g,a[3]=b[3]*g),a},g.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]},g.lerp=function(a,b,c,d){var e=b[0],f=b[1],g=b[2],h=b[3];return a[0]=e+d*(c[0]-e),a[1]=f+d*(c[1]-f),a[2]=g+d*(c[2]-g),a[3]=h+d*(c[3]-h),a},g.random=function(a,b){return b=b||1,a[0]=d(),a[1]=d(),a[2]=d(),a[3]=d(),g.normalize(a,a),g.scale(a,a,b),a},g.transformMat4=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3];return a[0]=c[0]*d+c[4]*e+c[8]*f+c[12]*g,a[1]=c[1]*d+c[5]*e+c[9]*f+c[13]*g,a[2]=c[2]*d+c[6]*e+c[10]*f+c[14]*g,a[3]=c[3]*d+c[7]*e+c[11]*f+c[15]*g,a},g.transformQuat=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=c[0],h=c[1],i=c[2],j=c[3],k=j*d+h*f-i*e,l=j*e+i*d-g*f,m=j*f+g*e-h*d,n=-g*d-h*e-i*f;return a[0]=k*j+n*-g+l*-i-m*-h,a[1]=l*j+n*-h+m*-g-k*-i,a[2]=m*j+n*-i+k*-h-l*-g,a},g.forEach=function(){var a=g.create();return function(b,c,d,e,f,g){var h,i;for(c||(c=4),d||(d=0),i=e?Math.min(e*c+d,b.length):b.length,h=d;i>h;h+=c)a[0]=b[h],a[1]=b[h+1],a[2]=b[h+2],a[3]=b[h+3],f(a,a,g),b[h]=a[0],b[h+1]=a[1],b[h+2]=a[2],b[h+3]=a[3];return b}}(),g.str=function(a){return"vec4("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+")"},a.vec4=g;var h={};h.create=function(){var a=new c(9);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=1,a[5]=0,a[6]=0,a[7]=0,a[8]=1,a},h.fromMat4=function(a,b){return a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[4],a[4]=b[5],a[5]=b[6],a[6]=b[8],a[7]=b[9],a[8]=b[10],a},h.clone=function(a){var b=new c(9);return b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b},h.copy=function(a,b){return a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],a[4]=b[4],a[5]=b[5],a[6]=b[6],a[7]=b[7],a[8]=b[8],a},h.identity=function(a){return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=1,a[5]=0,a[6]=0,a[7]=0,a[8]=1,a},h.transpose=function(a,b){if(a===b){var c=b[1],d=b[2],e=b[5];a[1]=b[3],a[2]=b[6],a[3]=c,a[5]=b[7],a[6]=d,a[7]=e}else a[0]=b[0],a[1]=b[3],a[2]=b[6],a[3]=b[1],a[4]=b[4],a[5]=b[7],a[6]=b[2],a[7]=b[5],a[8]=b[8];return a},h.invert=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],h=b[5],i=b[6],j=b[7],k=b[8],l=k*g-h*j,m=-k*f+h*i,n=j*f-g*i,o=c*l+d*m+e*n;return o?(o=1/o,a[0]=l*o,a[1]=(-k*d+e*j)*o,a[2]=(h*d-e*g)*o,a[3]=m*o,a[4]=(k*c-e*i)*o,a[5]=(-h*c+e*f)*o,a[6]=n*o,a[7]=(-j*c+d*i)*o,a[8]=(g*c-d*f)*o,a):null},h.adjoint=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],h=b[5],i=b[6],j=b[7],k=b[8];return a[0]=g*k-h*j,a[1]=e*j-d*k,a[2]=d*h-e*g,a[3]=h*i-f*k,a[4]=c*k-e*i,a[5]=e*f-c*h,a[6]=f*j-g*i,a[7]=d*i-c*j,a[8]=c*g-d*f,a},h.determinant=function(a){var b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=a[6],i=a[7],j=a[8];return b*(j*f-g*i)+c*(-j*e+g*h)+d*(i*e-f*h)},h.multiply=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],i=b[5],j=b[6],k=b[7],l=b[8],m=c[0],n=c[1],o=c[2],p=c[3],q=c[4],r=c[5],s=c[6],t=c[7],u=c[8];return a[0]=m*d+n*g+o*j,a[1]=m*e+n*h+o*k,a[2]=m*f+n*i+o*l,a[3]=p*d+q*g+r*j,a[4]=p*e+q*h+r*k,a[5]=p*f+q*i+r*l,a[6]=s*d+t*g+u*j,a[7]=s*e+t*h+u*k,a[8]=s*f+t*i+u*l,a},h.mul=h.multiply,h.translate=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],i=b[5],j=b[6],k=b[7],l=b[8],m=c[0],n=c[1];return a[0]=d,a[1]=e,a[2]=f,a[3]=g,a[4]=h,a[5]=i,a[6]=m*d+n*g+j,a[7]=m*e+n*h+k,a[8]=m*f+n*i+l,a},h.rotate=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],i=b[5],j=b[6],k=b[7],l=b[8],m=Math.sin(c),n=Math.cos(c);return a[0]=n*d+m*g,a[1]=n*e+m*h,a[2]=n*f+m*i,a[3]=n*g-m*d,a[4]=n*h-m*e,a[5]=n*i-m*f,a[6]=j,a[7]=k,a[8]=l,a},h.fromQuat=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=c+c,h=d+d,i=e+e,j=c*g,k=c*h,l=c*i,m=d*h,n=d*i,o=e*i,p=f*g,q=f*h,r=f*i;return a[0]=1-(m+o),a[3]=k+r,a[6]=l-q,a[1]=k-r,a[4]=1-(j+o),a[7]=n+p,a[2]=l+q,a[5]=n-p,a[8]=1-(j+m),a},h.normalFromMat4=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],h=b[5],i=b[6],j=b[7],k=b[8],l=b[9],m=b[10],n=b[11],o=b[12],p=b[13],q=b[14],r=b[15],s=c*h-d*g,t=c*i-e*g,u=c*j-f*g,v=d*i-e*h,w=d*j-f*h,x=e*j-f*i,y=k*p-l*o,z=k*q-m*o,A=k*r-n*o,B=l*q-m*p,C=l*r-n*p,D=m*r-n*q,E=s*D-t*C+u*B+v*A-w*z+x*y;return E?(E=1/E,a[0]=(h*D-i*C+j*B)*E,a[1]=(i*A-g*D-j*z)*E,a[2]=(g*C-h*A+j*y)*E,a[3]=(e*C-d*D-f*B)*E,a[4]=(c*D-e*A+f*z)*E,a[5]=(d*A-c*C-f*y)*E,a[6]=(p*x-q*w+r*v)*E,a[7]=(q*u-o*x-r*t)*E,a[8]=(o*w-p*u+r*s)*E,a):null},h.str=function(a){return"mat3("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+")"},a.mat3=h;var i={};i.create=function(){var a=new c(16);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},i.fromValues=function(a,b,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r=new c(16);return r[0]=a,r[1]=b,r[2]=d,r[3]=e,r[4]=f,r[5]=g,r[6]=h,r[7]=i,r[8]=j,r[9]=k,r[10]=l,r[11]=m,r[12]=n,r[13]=o,r[14]=p,r[15]=q,r},i.clone=function(a){var b=new c(16);return b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b[9]=a[9],b[10]=a[10],b[11]=a[11],b[12]=a[12],b[13]=a[13],b[14]=a[14],b[15]=a[15],b},i.copy=function(a,b){return a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],a[4]=b[4],a[5]=b[5],a[6]=b[6],a[7]=b[7],a[8]=b[8],a[9]=b[9],a[10]=b[10],a[11]=b[11],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15],a},i.identity=function(a){return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},i.transpose=function(a,b){if(a===b){var c=b[1],d=b[2],e=b[3],f=b[6],g=b[7],h=b[11];a[1]=b[4],a[2]=b[8],a[3]=b[12],a[4]=c,a[6]=b[9],a[7]=b[13],a[8]=d,a[9]=f,a[11]=b[14],a[12]=e,a[13]=g,a[14]=h}else a[0]=b[0],a[1]=b[4],a[2]=b[8],a[3]=b[12],a[4]=b[1],a[5]=b[5],a[6]=b[9],a[7]=b[13],a[8]=b[2],a[9]=b[6],a[10]=b[10],a[11]=b[14],a[12]=b[3],a[13]=b[7],a[14]=b[11],a[15]=b[15];return a},i.invert=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],h=b[5],i=b[6],j=b[7],k=b[8],l=b[9],m=b[10],n=b[11],o=b[12],p=b[13],q=b[14],r=b[15],s=c*h-d*g,t=c*i-e*g,u=c*j-f*g,v=d*i-e*h,w=d*j-f*h,x=e*j-f*i,y=k*p-l*o,z=k*q-m*o,A=k*r-n*o,B=l*q-m*p,C=l*r-n*p,D=m*r-n*q,E=s*D-t*C+u*B+v*A-w*z+x*y;return E?(E=1/E,a[0]=(h*D-i*C+j*B)*E,a[1]=(e*C-d*D-f*B)*E,a[2]=(p*x-q*w+r*v)*E,a[3]=(m*w-l*x-n*v)*E,a[4]=(i*A-g*D-j*z)*E,a[5]=(c*D-e*A+f*z)*E,a[6]=(q*u-o*x-r*t)*E,a[7]=(k*x-m*u+n*t)*E,a[8]=(g*C-h*A+j*y)*E,a[9]=(d*A-c*C-f*y)*E,a[10]=(o*w-p*u+r*s)*E,a[11]=(l*u-k*w-n*s)*E,a[12]=(h*z-g*B-i*y)*E,a[13]=(c*B-d*z+e*y)*E,a[14]=(p*t-o*v-q*s)*E,a[15]=(k*v-l*t+m*s)*E,a):null},i.adjoint=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],h=b[5],i=b[6],j=b[7],k=b[8],l=b[9],m=b[10],n=b[11],o=b[12],p=b[13],q=b[14],r=b[15];return a[0]=h*(m*r-n*q)-l*(i*r-j*q)+p*(i*n-j*m),a[1]=-(d*(m*r-n*q)-l*(e*r-f*q)+p*(e*n-f*m)),a[2]=d*(i*r-j*q)-h*(e*r-f*q)+p*(e*j-f*i),a[3]=-(d*(i*n-j*m)-h*(e*n-f*m)+l*(e*j-f*i)),a[4]=-(g*(m*r-n*q)-k*(i*r-j*q)+o*(i*n-j*m)),a[5]=c*(m*r-n*q)-k*(e*r-f*q)+o*(e*n-f*m),a[6]=-(c*(i*r-j*q)-g*(e*r-f*q)+o*(e*j-f*i)),a[7]=c*(i*n-j*m)-g*(e*n-f*m)+k*(e*j-f*i),a[8]=g*(l*r-n*p)-k*(h*r-j*p)+o*(h*n-j*l),a[9]=-(c*(l*r-n*p)-k*(d*r-f*p)+o*(d*n-f*l)),a[10]=c*(h*r-j*p)-g*(d*r-f*p)+o*(d*j-f*h),a[11]=-(c*(h*n-j*l)-g*(d*n-f*l)+k*(d*j-f*h)),a[12]=-(g*(l*q-m*p)-k*(h*q-i*p)+o*(h*m-i*l)),a[13]=c*(l*q-m*p)-k*(d*q-e*p)+o*(d*m-e*l),a[14]=-(c*(h*q-i*p)-g*(d*q-e*p)+o*(d*i-e*h)),a[15]=c*(h*m-i*l)-g*(d*m-e*l)+k*(d*i-e*h),a},i.determinant=function(a){var b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=a[6],i=a[7],j=a[8],k=a[9],l=a[10],m=a[11],n=a[12],o=a[13],p=a[14],q=a[15],r=b*g-c*f,s=b*h-d*f,t=b*i-e*f,u=c*h-d*g,v=c*i-e*g,w=d*i-e*h,x=j*o-k*n,y=j*p-l*n,z=j*q-m*n,A=k*p-l*o,B=k*q-m*o,C=l*q-m*p;return r*C-s*B+t*A+u*z-v*y+w*x},i.multiply=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],i=b[5],j=b[6],k=b[7],l=b[8],m=b[9],n=b[10],o=b[11],p=b[12],q=b[13],r=b[14],s=b[15],t=c[0],u=c[1],v=c[2],w=c[3];return a[0]=t*d+u*h+v*l+w*p,a[1]=t*e+u*i+v*m+w*q,a[2]=t*f+u*j+v*n+w*r,a[3]=t*g+u*k+v*o+w*s,t=c[4],u=c[5],v=c[6],w=c[7],a[4]=t*d+u*h+v*l+w*p,a[5]=t*e+u*i+v*m+w*q,a[6]=t*f+u*j+v*n+w*r,a[7]=t*g+u*k+v*o+w*s,t=c[8],u=c[9],v=c[10],w=c[11],a[8]=t*d+u*h+v*l+w*p,a[9]=t*e+u*i+v*m+w*q,a[10]=t*f+u*j+v*n+w*r,a[11]=t*g+u*k+v*o+w*s,t=c[12],u=c[13],v=c[14],w=c[15],a[12]=t*d+u*h+v*l+w*p,a[13]=t*e+u*i+v*m+w*q,a[14]=t*f+u*j+v*n+w*r,a[15]=t*g+u*k+v*o+w*s,a},i.fromMat3=function(a,b){return a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=0,a[4]=b[3],a[5]=b[4],a[6]=b[5],a[7]=0,a[8]=b[6],a[9]=b[7],a[10]=b[8],a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},i.mul=i.multiply,i.translate=function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p=c[0],q=c[1],r=c[2];return b===a?(a[12]=b[0]*p+b[4]*q+b[8]*r+b[12],a[13]=b[1]*p+b[5]*q+b[9]*r+b[13],a[14]=b[2]*p+b[6]*q+b[10]*r+b[14],a[15]=b[3]*p+b[7]*q+b[11]*r+b[15]):(d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],i=b[5],j=b[6],k=b[7],l=b[8],m=b[9],n=b[10],o=b[11],a[0]=d,a[1]=e,a[2]=f,a[3]=g,a[4]=h,a[5]=i,a[6]=j,a[7]=k,a[8]=l,a[9]=m,a[10]=n,a[11]=o,a[12]=d*p+h*q+l*r+b[12],a[13]=e*p+i*q+m*r+b[13],a[14]=f*p+j*q+n*r+b[14],a[15]=g*p+k*q+o*r+b[15]),a},i.scale=function(a,b,c){var d=c[0],e=c[1],f=c[2];return a[0]=b[0]*d,a[1]=b[1]*d,a[2]=b[2]*d,a[3]=b[3]*d,a[4]=b[4]*e,a[5]=b[5]*e,a[6]=b[6]*e,a[7]=b[7]*e,a[8]=b[8]*f,a[9]=b[9]*f,a[10]=b[10]*f,a[11]=b[11]*f,a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15],a},i.rotate=function(a,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D=e[0],E=e[1],F=e[2],G=Math.sqrt(D*D+E*E+F*F);return Math.abs(G)<b?null:(G=1/G,D*=G,E*=G,F*=G,f=Math.sin(d),g=Math.cos(d),h=1-g,i=c[0],j=c[1],k=c[2],l=c[3],m=c[4],n=c[5],o=c[6],p=c[7],q=c[8],r=c[9],s=c[10],t=c[11],u=D*D*h+g,v=E*D*h+F*f,w=F*D*h-E*f,x=D*E*h-F*f,y=E*E*h+g,z=F*E*h+D*f,A=D*F*h+E*f,B=E*F*h-D*f,C=F*F*h+g,a[0]=i*u+m*v+q*w,a[1]=j*u+n*v+r*w,a[2]=k*u+o*v+s*w,a[3]=l*u+p*v+t*w,a[4]=i*x+m*y+q*z,a[5]=j*x+n*y+r*z,a[6]=k*x+o*y+s*z,a[7]=l*x+p*y+t*z,a[8]=i*A+m*B+q*C,a[9]=j*A+n*B+r*C,a[10]=k*A+o*B+s*C,a[11]=l*A+p*B+t*C,c!==a&&(a[12]=c[12],a[13]=c[13],a[14]=c[14],a[15]=c[15]),a)},i.rotateX=function(a,b,c){var d=Math.sin(c),e=Math.cos(c),f=b[4],g=b[5],h=b[6],i=b[7],j=b[8],k=b[9],l=b[10],m=b[11];return b!==a&&(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]),a[4]=f*e+j*d,a[5]=g*e+k*d,a[6]=h*e+l*d,a[7]=i*e+m*d,a[8]=j*e-f*d,a[9]=k*e-g*d,a[10]=l*e-h*d,a[11]=m*e-i*d,a},i.rotateY=function(a,b,c){var d=Math.sin(c),e=Math.cos(c),f=b[0],g=b[1],h=b[2],i=b[3],j=b[8],k=b[9],l=b[10],m=b[11];return b!==a&&(a[4]=b[4],a[5]=b[5],a[6]=b[6],a[7]=b[7],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]),a[0]=f*e-j*d,a[1]=g*e-k*d,a[2]=h*e-l*d,a[3]=i*e-m*d,a[8]=f*d+j*e,a[9]=g*d+k*e,a[10]=h*d+l*e,a[11]=i*d+m*e,a},i.rotateZ=function(a,b,c){var d=Math.sin(c),e=Math.cos(c),f=b[0],g=b[1],h=b[2],i=b[3],j=b[4],k=b[5],l=b[6],m=b[7];return b!==a&&(a[8]=b[8],a[9]=b[9],a[10]=b[10],a[11]=b[11],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]),a[0]=f*e+j*d,a[1]=g*e+k*d,a[2]=h*e+l*d,a[3]=i*e+m*d,a[4]=j*e-f*d,a[5]=k*e-g*d,a[6]=l*e-h*d,a[7]=m*e-i*d,a},i.fromRotationTranslation=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=d+d,i=e+e,j=f+f,k=d*h,l=d*i,m=d*j,n=e*i,o=e*j,p=f*j,q=g*h,r=g*i,s=g*j;return a[0]=1-(n+p),a[1]=l+s,a[2]=m-r,a[3]=0,a[4]=l-s,a[5]=1-(k+p),a[6]=o+q,a[7]=0,a[8]=m+r,a[9]=o-q,a[10]=1-(k+n),a[11]=0,a[12]=c[0],a[13]=c[1],a[14]=c[2],a[15]=1,a},i.fromQuat=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=c+c,h=d+d,i=e+e,j=c*g,k=c*h,l=c*i,m=d*h,n=d*i,o=e*i,p=f*g,q=f*h,r=f*i;return a[0]=1-(m+o),a[1]=k+r,a[2]=l-q,a[3]=0,a[4]=k-r,a[5]=1-(j+o),a[6]=n+p,a[7]=0,a[8]=l+q,a[9]=n-p,a[10]=1-(j+m),a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},i.frustum=function(a,b,c,d,e,f,g){var h=1/(c-b),i=1/(e-d),j=1/(f-g);return a[0]=2*f*h,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=2*f*i,a[6]=0,a[7]=0,a[8]=(c+b)*h,a[9]=(e+d)*i,a[10]=(g+f)*j,a[11]=-1,a[12]=0,a[13]=0,a[14]=g*f*2*j,a[15]=0,a},i.perspective=function(a,b,c,d,e){var f=1/Math.tan(b/2),g=1/(d-e);return a[0]=f/c,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=f,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=(e+d)*g,a[11]=-1,a[12]=0,a[13]=0,a[14]=2*e*d*g,a[15]=0,a},i.ortho=function(a,b,c,d,e,f,g){var h=1/(b-c),i=1/(d-e),j=1/(f-g);return a[0]=-2*h,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=-2*i,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=2*j,a[11]=0,a[12]=(b+c)*h,a[13]=(e+d)*i,a[14]=(g+f)*j,a[15]=1,a},i.lookAt=function(a,c,d,e){var f,g,h,j,k,l,m,n,o,p,q=c[0],r=c[1],s=c[2],t=e[0],u=e[1],v=e[2],w=d[0],x=d[1],y=d[2];return Math.abs(q-w)<b&&Math.abs(r-x)<b&&Math.abs(s-y)<b?i.identity(a):(m=q-w,n=r-x,o=s-y,p=1/Math.sqrt(m*m+n*n+o*o),m*=p,n*=p,o*=p,f=u*o-v*n,g=v*m-t*o,h=t*n-u*m,p=Math.sqrt(f*f+g*g+h*h),p?(p=1/p,f*=p,g*=p,h*=p):(f=0,g=0,h=0),j=n*h-o*g,k=o*f-m*h,l=m*g-n*f,p=Math.sqrt(j*j+k*k+l*l),p?(p=1/p,j*=p,k*=p,l*=p):(j=0,k=0,l=0),a[0]=f,a[1]=j,a[2]=m,a[3]=0,a[4]=g,a[5]=k,a[6]=n,a[7]=0,a[8]=h,a[9]=l,a[10]=o,a[11]=0,a[12]=-(f*q+g*r+h*s),a[13]=-(j*q+k*r+l*s),a[14]=-(m*q+n*r+o*s),a[15]=1,a)},i.str=function(a){return"mat4("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+")"},a.mat4=i;var j={};return j.create=function(){var a=new c(4);return a[0]=0,a[1]=0,a[2]=0,a[3]=1,a},j.rotationTo=function(){var a=f.create(),b=f.fromValues(1,0,0),c=f.fromValues(0,1,0);return function(d,e,g){var h=f.dot(e,g);return-.999999>h?(f.cross(a,b,e),f.length(a)<1e-6&&f.cross(a,c,e),f.normalize(a,a),j.setAxisAngle(d,a,Math.PI),d):h>.999999?(d[0]=0,d[1]=0,d[2]=0,d[3]=1,d):(f.cross(a,e,g),d[0]=a[0],d[1]=a[1],d[2]=a[2],d[3]=1+h,j.normalize(d,d))}}(),j.setAxes=function(){var a=h.create();return function(b,c,d,e){return a[0]=d[0],a[3]=d[1],a[6]=d[2],a[1]=e[0],a[4]=e[1],a[7]=e[2],a[2]=c[0],a[5]=c[1],a[8]=c[2],j.normalize(b,j.fromMat3(b,a))}}(),j.clone=g.clone,j.fromValues=g.fromValues,j.copy=g.copy,j.set=g.set,j.identity=function(a){return a[0]=0,a[1]=0,a[2]=0,a[3]=1,a},j.setAxisAngle=function(a,b,c){c=.5*c;var d=Math.sin(c);return a[0]=d*b[0],a[1]=d*b[1],a[2]=d*b[2],a[3]=Math.cos(c),a},j.add=g.add,j.multiply=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=c[0],i=c[1],j=c[2],k=c[3];return a[0]=d*k+g*h+e*j-f*i,a[1]=e*k+g*i+f*h-d*j,a[2]=f*k+g*j+d*i-e*h,a[3]=g*k-d*h-e*i-f*j,a},j.mul=j.multiply,j.scale=g.scale,j.rotateX=function(a,b,c){c*=.5;var d=b[0],e=b[1],f=b[2],g=b[3],h=Math.sin(c),i=Math.cos(c);return a[0]=d*i+g*h,a[1]=e*i+f*h,a[2]=f*i-e*h,a[3]=g*i-d*h,a},j.rotateY=function(a,b,c){c*=.5;var d=b[0],e=b[1],f=b[2],g=b[3],h=Math.sin(c),i=Math.cos(c);return a[0]=d*i-f*h,a[1]=e*i+g*h,a[2]=f*i+d*h,a[3]=g*i-e*h,a},j.rotateZ=function(a,b,c){c*=.5;var d=b[0],e=b[1],f=b[2],g=b[3],h=Math.sin(c),i=Math.cos(c);return a[0]=d*i+e*h,a[1]=e*i-d*h,a[2]=f*i+g*h,a[3]=g*i-f*h,a},j.calculateW=function(a,b){var c=b[0],d=b[1],e=b[2];return a[0]=c,a[1]=d,a[2]=e,a[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e)),a},j.dot=g.dot,j.lerp=g.lerp,j.slerp=function(a,b,c,d){var e,f,g,h,i,j=b[0],k=b[1],l=b[2],m=b[3],n=c[0],o=c[1],p=c[2],q=c[3];return f=j*n+k*o+l*p+m*q,0>f&&(f=-f,n=-n,o=-o,p=-p,q=-q),1-f>1e-6?(e=Math.acos(f),g=Math.sin(e),h=Math.sin((1-d)*e)/g,i=Math.sin(d*e)/g):(h=1-d,i=d),a[0]=h*j+i*n,a[1]=h*k+i*o,a[2]=h*l+i*p,a[3]=h*m+i*q,a},j.invert=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=c*c+d*d+e*e+f*f,h=g?1/g:0;return a[0]=-c*h,a[1]=-d*h,a[2]=-e*h,a[3]=f*h,a},j.conjugate=function(a,b){return a[0]=-b[0],a[1]=-b[1],a[2]=-b[2],a[3]=b[3],a},j.length=g.length,j.len=j.length,j.squaredLength=g.squaredLength,j.sqrLen=j.squaredLength,j.normalize=g.normalize,j.fromMat3=function(){var a="undefined"!=typeof Int8Array?new Int8Array([1,2,0]):[1,2,0];return function(b,c){var d,e=c[0]+c[4]+c[8];if(e>0)d=Math.sqrt(e+1),b[3]=.5*d,d=.5/d,b[0]=(c[7]-c[5])*d,b[1]=(c[2]-c[6])*d,b[2]=(c[3]-c[1])*d;else{var f=0;c[4]>c[0]&&(f=1),c[8]>c[3*f+f]&&(f=2);var g=a[f],h=a[g];d=Math.sqrt(c[3*f+f]-c[3*g+g]-c[3*h+h]+1),b[f]=.5*d,d=.5/d,b[3]=(c[3*h+g]-c[3*g+h])*d,b[g]=(c[3*g+f]+c[3*f+g])*d,b[h]=(c[3*h+f]+c[3*f+h])*d}return b}}(),j.str=function(a){return"quat("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+")"},a.quat=j,a}(),b=function(){function b(a,b){this._colors=a;for(var c=0;c<this._colors.length;++c)this._colors[c]=g.forceRGB(this._colors[c]);this._stops=b}function c(a,b,c){this.colorFor=a,this._beginFunc=b,this._endFunc=c}function d(a,b,c){var d=null,e=null;return a[b](function(a){var b=a.prop(c);return null===d&&null===e?void(d=e=b):(d=Math.min(d,b),void(e=Math.max(e,b)))}),{min:d,max:e}}function e(a,b,e,f,g){return b||(b=k("rainbow")),new c(function(c,d,e){var f=0;this._min!==this._max&&(f=(g(c).prop(a)-this._min)/(this._max-this._min)),m(d,e,b,f)},function(b){return void 0!==e?(this._min=e[0],void(this._max=e[1])):(e=d(b,f,a),this._min=e.min,void(this._max=e.max))},function(){})}var f=a.vec4,g={};g.rgb={};var h=g.rgb;g.rgb.create=f.create,g.rgb.scale=f.scale,g.rgb.copy=f.copy,g.rgb.fromValues=f.fromValues,g.rgb.mix=function(a,b,c,d){var e=1-d;return a[0]=b[0]*d+c[0]*e,a[1]=b[1]*d+c[1]*e,a[2]=b[2]*d+c[2]*e,a[3]=b[3]*d+c[3]*e,a};var i={white:h.fromValues(1,1,1,1),black:h.fromValues(0,0,0,1),grey:h.fromValues(.5,.5,.5,1),lightgrey:h.fromValues(.8,.8,.8,1),darkgrey:h.fromValues(.3,.3,.3,1),red:h.fromValues(1,0,0,1),darkred:h.fromValues(.5,0,0,1),lightred:h.fromValues(1,.5,.5,1),green:h.fromValues(0,1,0,1),darkgreen:h.fromValues(0,.5,0,1),lightgreen:h.fromValues(.5,1,.5,1),blue:h.fromValues(0,0,1,1),darkblue:h.fromValues(0,0,.5,1),lightblue:h.fromValues(.5,.5,1,1),yellow:h.fromValues(1,1,0,1),darkyellow:h.fromValues(.5,.5,0,1),lightyellow:h.fromValues(1,1,.5,1),cyan:h.fromValues(0,1,1,1),darkcyan:h.fromValues(0,.5,.5,1),lightcyan:h.fromValues(.5,1,1,1),magenta:h.fromValues(1,0,1,1),darkmagenta:h.fromValues(.5,0,.5,1),lightmagenta:h.fromValues(1,.5,1,1),orange:h.fromValues(1,.5,0,1),darkorange:h.fromValues(.5,.25,0,1),lightorange:h.fromValues(1,.75,.5,1)};g.hex2rgb=function(a){var b,c,d,e;if(4===a.length||5===a.length){b=parseInt(a[1],16),c=parseInt(a[2],16),d=parseInt(a[3],16),e=15,5===a.length&&(e=parseInt(a[4],16));var f=1/15;return h.fromValues(f*b,f*c,f*d,f*e)}if(7===a.length||9===a.length){b=parseInt(a.substr(1,2),16),c=parseInt(a.substr(3,2),16),d=parseInt(a.substr(5,2),16),e=255,9===a.length&&(e=parseInt(a.substr(7,2),16));var g=1/255;return h.fromValues(g*b,g*c,g*d,g*e)}},g.setColorPalette=function(a){i=a,g.initGradients()},g.forceRGB=function(a){if("string"==typeof a){var b=i[a];if(void 0!==b)return b;if(a.length>0&&"#"===a[0])return g.hex2rgb(a)}return 3===a.length?[a[0],a[1],a[2],1]:a},b.prototype={colorAt:function(a,b){if(b<=this._stops[0])return f.copy(a,this._colors[0]);if(b>=this._stops[this._stops.length-1])return f.copy(a,this._colors[this._stops.length-1]);for(var c=0,d=1;d<this._stops.length&&!(this._stops[d]>b);++d)c=d;var e=c+1,g=this._stops[c],i=this._stops[e],j=(b-g)/(i-g);return h.mix(a,this._colors[e],this._colors[c],j)}};var j={};g.gradient=function(a,c){if("string"==typeof a)return j[a];if(c=c||"equal","equal"===c){c=[];for(var d=0;d<a.length;++d)c.push(1*d/(a.length-1))}return new b(a,c)};var k=g.gradient;g.initGradients=function(){j.rainbow=k(["red","yellow","green","blue"]),j.reds=k(["lightred","darkred"]),j.greens=k(["lightgreen","darkgreen"]),j.blues=k(["lightblue","darkblue"]),j.trafficlight=k(["green","yellow","red"]),j.heatmap=k(["red","white","blue"])},c.prototype={begin:function(a){this._beginFunc&&this._beginFunc(a)},end:function(a){this._endFunc&&this._endFunc(a)}},g.ColorOp=c,g.uniform=function(a){return a=g.forceRGB(a||"white"),new c(function(b,c,d){c[d+0]=a[0],c[d+1]=a[1],c[d+2]=a[2],c[d+3]=a[3]},null,null)};var l={H:[1,1,1],C:[.83,.83,.83],N:[.13,.2,1],O:[1,.13,0],F:[.12,.94,.12],CL:[.12,.94,.12],BR:[.6,.13,0],I:[.4,0,.73],HE:[0,1,1],NE:[0,1,1],AR:[0,1,1],XE:[0,1,1],KR:[0,1,1],P:[1,.6,0],S:[.87,.87,0],B:[1,.67,.47],LI:[.47,0,1],NA:[.47,0,1],K:[.47,0,1],RB:[.47,0,1],CS:[.47,0,1],FR:[.47,0,1],BE:[0,.47,0],MG:[0,.47,0],SR:[0,.47,0],BA:[0,.47,0],RA:[0,.47,0],TI:[.6,.6,.6],FE:[.87,.47,0]};g.byElement=function(){return new c(function(a,b,c){var d=a.element(),e=l[d];return void 0!==e?(b[c]=e[0],b[c+1]=e[1],b[c+2]=e[2],b[c+3]=1,b):(b[c]=1,b[c+1]=0,b[c+2]=1,b[c+3]=1,b)},null,null)},g.bySS=function(){return new c(function(a,b,c){switch(a.residue().ss()){case"C":return b[c]=.8,b[c+1]=.8,b[c+2]=.8,void(b[c+3]=1);case"H":return b[c]=.6,b[c+1]=.6,b[c+2]=.9,void(b[c+3]=1);case"E":return b[c]=.2,b[c+1]=.8,b[c+2]=.2,void(b[c+3]=1)}},null,null)},g.rainbow=function(a){a||(a=k("rainbow"));var b=new c(function(b,c,d){var e=0,f=this.chainLimits[b.residue().chain().name()];if(void 0!==f){var g=b.residue().index();e=(g-f[0])/(f[1]-f[0])}var h=[1,1,1,1];a.colorAt(h,e),c[d]=h[0],c[d+1]=h[1],c[d+2]=h[2],c[d+3]=h[3]},function(a){var b=a.chains();this.chainLimits={};for(var c=0;c<b.length;++c){var d=b[c].backboneTraces();if(0!==d.length){for(var e=d[0].residueAt(0).index(),f=d[0].residueAt(d[0].length()-1).index(),g=1;g<d.length;++g){var h=d[g];e=Math.min(e,h.residueAt(0).index()),f=Math.max(f,h.residueAt(h.length()-1).index())}e!==f&&(this.chainLimits[b[c].name()]=[e,f])}}},function(){this.chainLimits=null});return b},g.ssSuccession=function(a,b){a||(a=k("rainbow")),b||(b=g.forceRGB("lightgrey"));var d=new c(function(c,d,e){var f=c.residue().index(),g=this.chainLimits[c.residue().chain().name()],h=g.indices[f];if(-1===h)return d[e]=b[0],d[e+1]=b[1],d[e+2]=b[2],void(d[e+3]=b[3]);var i=0;null===g.max,null!==g.max&&(i=h/(g.max>0?g.max:1));var j=[0,0,0,0];a.colorAt(j,i),d[e]=j[0],d[e+1]=j[1],d[e+2]=j[2],d[e+3]=j[3]},function(a){var b=a.chains();this.chainLimits={};for(var c=0;c<b.length;++c){for(var d=b[c].residues(),e=null,f={},g=0,h="C",i=0;i<d.length;++i){var j=d[i].ss();"C"===j?("C"!==h&&g++,f[d[i].index()]=-1):(e=g,f[d[i].index()]=g),h=j}this.chainLimits[b[c].name()]={indices:f,max:e}}},function(){this.chainLimits=null});return d},g.byChain=function(a){a||(a=k("rainbow"));var b=new c(function(b,c,d){var e=this.chainIndices[b.residue().chain().name()],f=e*this.scale,g=[0,0,0,0];a.colorAt(g,f),c[d+0]=g[0],c[d+1]=g[1],c[d+2]=g[2],c[d+3]=g[3]},function(a){var b=a.chains();this.chainIndices={};for(var c=0;c<b.length;++c)this.chainIndices[b[c].name()]=c;this.scale=b.length>1?1/(b.length-1):1},function(){this.chainIndices=null});return b};var m=function(){var a=f.create();return function(b,c,d,e){d.colorAt(a,e),b[c+0]=a[0],b[c+1]=a[1],b[c+2]=a[2],b[c+3]=a[3]}}();return g.byAtomProp=function(a,b,c){return e(a,b,c,"eachAtom",function(a){return a})},g.byResidueProp=function(a,b,c){return e(a,b,c,"eachResidue",function(a){return a.residue()})},g.interpolateColor=function(a,b){for(var c=new Float32Array(4*(b*(a.length/4-1)+1)),d=0,e=f.create(),g=f.create(),h=1/b,i=0;i<a.length/4-1;++i){f.set(e,a[4*i+0],a[4*i+1],a[4*i+2],a[4*i+3]),f.set(g,a[4*i+4],a[4*i+5],a[4*i+6],a[4*i+7]);for(var j=0;b>j;++j){var k=h*j;c[d+0]=e[0]*(1-k)+g[0]*k,c[d+1]=e[1]*(1-k)+g[1]*k,c[d+2]=e[2]*(1-k)+g[2]*k,c[d+3]=e[3]*(1-k)+g[3]*k,d+=4}}return c[d+0]=g[0],c[d+1]=g[1],c[d+2]=g[2],c[d+3]=g[3],c},g.initGradients(),g}(),c=function(){function a(a,b){this.near=a,this.far=b}function b(a){a=a||{},this._near=a.near||.1,this._far=a.far||400}function c(){this._far=100}return b.prototype.update=function(){return new a(this._near,this._far)},c.prototype.update=function(b,c){for(var d=c.center(),e=null,f=0;f<b.length;++f){var g=b[f];g.visible()&&(e=g.updateSquaredSphereRadius(d,e))}if(null===e)return null;e=Math.sqrt(e);var h=c.zoom(),i=1.05*(e+h),j=.1;return new a(j,i)},{FixedSlab:b,AutoSlab:c,Slab:a}}(),d=function(){function a(a,b,c){this._pool=a,this._start=b,this._next=b,this._end=c}function b(){this._objects={},this._unusedRangeStart=0,this._free=[]}return a.prototype={nextId:function(a){var b=this._next;return this._next++,this._pool._objects[b]=a,b},recycle:function(){this._pool.recycle(this)},length:function(){return this._end-this._start}},b.prototype={getContinuousRange:function(b){for(var c=-1,d=null,e=0;e<this._free.length;++e){var f=this._free[e],g=f.length();g>=b&&(null===d||d>g)&&(d=g,c=e)}if(-1!==c){var h=this._free[c];return this._free.splice(c,1),h}var i=this._unusedRangeStart,j=i+b;return j>65536?null:(this._unusedRangeStart=j,new a(this,i,j))},recycle:function(a){for(var b=a._start;b<a._next;++b)delete this._objects[b];a._next=a._start,this._free.push(a)},objectForId:function(a){return this._objects[a]}},b}(),e=function(){function a(a,b){return b>a}function b(a,b){void 0===a||void 0===b?(this._empty=!0,this._min=this._max=null):(this._empty=!1,this._min=a,this._max=b)}var c={};return c.derive=function(a,b,c){for(var d in b.prototype)a.prototype[d]=b.prototype[d];if(void 0!==c)for(var e in c)a.prototype[e]=c[e]},c.bind=function(a,b){return function(){return b.apply(a,arguments)}},c.copy=function(a){a=a||{};var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},c.binarySearch=function(b,c,d){if(0===b.length)return-1;d=d||a;for(var e=0,f=b.length,g=e+f>>1;;){var h=b[g];if(d(c,h))f=g;else{if(!d(h,c))return g;e=g}var i=e+f>>1;if(i===g)return-1;g=i}return-1},c.indexFirstLargerEqualThan=function(b,c,d){if(d=d||a,0===b.length||d(b[b.length-1],c))return-1;for(var e=0,f=b.length,g=e+f>>1;;){var h=b[g];d(c,h)?f=g:d(h,c)?e=g+1:f=g;var i=e+f>>1;if(i===g)return g;g=i}},c.indexLastSmallerThan=function(b,c,d){if(d=d||a,0===b.length||d(b[b.length-1],c))return b.length-1;if(d(c,b[0])||!d(b[0],c))return-1;for(var e=0,f=b.length,g=e+f>>1;;){var h=b[g];d(c,h)||!d(h,c)?f=g:e=g;var i=e+f>>1;if(i===g)return g;g=i}},c.indexLastSmallerEqualThan=function(b,c,d){if(d=d||a,0===b.length||d(b[b.length-1],c))return b.length-1;if(d(c,b[0]))return-1;for(var e=0,f=b.length,g=e+f>>1;;){var h=b[g];d(c,h)?f=g:e=g;var i=e+f>>1;if(i===g)return g;g=i}},b.prototype={min:function(){return this._min},max:function(){return this._max},length:function(){return this._max-this._min},empty:function(){return this._empty},center:function(){return.5*(this._max+this._min)},extend:function(a){this._min-=a,this._max+=a},update:function(a){return this._empty?(this._min=this._max=a,void(this._empty=!1)):void(a<this._min?this._min=a:a>this._max&&(this._max=a))}},c.Range=b,c}(),f=function(){function a(a,b){this._width=b.width,this._height=b.height,this._colorBufferWidth=this._width,this._colorBufferHeight=this._height,this._gl=a,this._colorHandle=a.createFramebuffer(),a.bindFramebuffer(a.FRAMEBUFFER,this._colorHandle),this._depthHandle=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,this._depthHandle),a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT16,this._width,this._height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,this._depthHandle),this._colorTexture=a.createTexture(),this._initColorBuffer()}return a.prototype={width:function(){return this._width},height:function(){return this._height},bind:function(){var a=this._gl;a.bindFramebuffer(a.FRAMEBUFFER,this._colorHandle),a.bindRenderbuffer(a.RENDERBUFFER,this._depthHandle),(this._colorBufferWidth!==this._width||this._colorBufferHeight!==this._height)&&this._resizeBuffers(),a.viewport(0,0,this._width,this._height)},colorTexture:function(){return this._colorTexture},_initColorBuffer:function(){this.bind();
var a=this._gl;a.bindTexture(a.TEXTURE_2D,this._colorTexture),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,this._width,this._height,0,a.RGBA,a.UNSIGNED_BYTE,null),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this._colorTexture,0),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.bindTexture(a.TEXTURE_2D,null),this.release()},_resizeBuffers:function(){var a=this._gl;a.bindRenderbuffer(a.RENDERBUFFER,this._depthHandle),a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT16,this._width,this._height),a.bindTexture(a.TEXTURE_2D,this._colorTexture),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,this._width,this._height,0,a.RGBA,a.UNSIGNED_BYTE,null),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this._colorTexture,0),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,this._depthHandle),a.bindTexture(a.TEXTURE_2D,null),this._colorBufferWidth=this._width,this._colorBufferHeight=this._height},resize:function(a,b){this._width=a,this._height=b},release:function(){var a=this._gl;a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindRenderbuffer(a.RENDERBUFFER,null)}},a}(),g=function(){function a(a){this._freeArrays=[],this._bufferType=a}return a.prototype.request=function(a){for(var b=-1,c=null,d=0;d<this._freeArrays.length;++d){var e=this._freeArrays[d],f=e.length;f>=a&&(null===c||c>f)&&(c=f,b=d)}if(-1!==b){var g=this._freeArrays[b];return this._freeArrays.splice(b,1),g}return new this._bufferType(a)},a.prototype.release=function(a){this._freeArrays.push(a)},a}(),h=function(){function b(a){this._projection=d.create(),this._camModelView=d.create(),this._modelView=d.create(),this._rotation=d.create(),this._translation=d.create(),this._near=.1,this._far=4e3,this._fogNear=-5,this._fogFar=50,this._fog=!0,this._fovY=45*Math.PI/180,this._fogColor=c.fromValues(1,1,1),this._outlineColor=c.fromValues(.1,.1,.1),this._center=c.create(),this._zoom=50,this._updateProjectionMat=!0,this._updateModelViewMat=!0,this._upsamplingFactor=1,this._gl=a,this._currentShader=null,this._stateId=0,this.setViewportSize(a.viewportWidth,a.viewportHeight)}var c=a.vec3,d=a.mat4;return b.prototype={_incrementStateId:function(){this._stateId+=1,this._stateId>68719476735&&(this._stateId=0)},setRotation:function(a){16===a.length?d.copy(this._rotation,a):d.fromMat3(this._rotation,a),this._updateModelViewMat=!0},upsamplingFactor:function(){return this._upsamplingFactor},setUpsamplingFactor:function(a){this._upsamplingFactor=a},mainAxes:function(){return[c.fromValues(this._rotation[0],this._rotation[4],this._rotation[8]),c.fromValues(this._rotation[1],this._rotation[5],this._rotation[9]),c.fromValues(this._rotation[2],this._rotation[6],this._rotation[10])]},fieldOfViewY:function(){return this._fovY},aspectRatio:function(){return this._width/this._height},rotation:function(){return this._rotation},_updateIfRequired:function(){var a=!1;return this._updateModelViewMat&&(d.identity(this._camModelView),d.translate(this._camModelView,this._camModelView,[-this._center[0],-this._center[1],-this._center[2]]),d.mul(this._camModelView,this._rotation,this._camModelView),d.identity(this._translation),d.translate(this._translation,this._translation,[0,0,-this._zoom]),d.mul(this._camModelView,this._translation,this._camModelView),a=!0),this._updateProjectionMat&&(d.identity(this._projection),d.perspective(this._projection,this._fovY,this._width/this._height,this._near,this._far),a=!0),this._updateProjectionMat=!1,this._updateModelViewMat=!1,a&&this._incrementStateId(),a},setViewportSize:function(a,b){this._updateProjectionMat=!0,this._width=a,this._height=b},viewportWidth:function(){return this._width},viewportHeight:function(){return this._height},setCenter:function(a){this._updateModelViewMat=!0,c.copy(this._center,a)},fog:function(a){return void 0!==a&&a!==this._fog&&(this._fog=a,this._incrementStateId()),this._fog},rotateZ:function(){var a=d.create();return function(b){d.identity(a),this._updateModelViewMat=!0,d.rotate(a,a,b,[0,0,1]),d.mul(this._rotation,a,this._rotation)}}(),rotateX:function(){var a=d.create();return function(b){d.identity(a),this._updateModelViewMat=!0,d.rotate(a,a,b,[1,0,0]),d.mul(this._rotation,a,this._rotation)}}(),rotateY:function(){var a=d.create();return function(b){d.identity(a),this._updateModelViewMat=!0,d.rotate(a,a,b,[0,1,0]),d.mul(this._rotation,a,this._rotation)}}(),panX:function(a){return this.panXY(a,0)},panY:function(a){return this.panXY(0,a)},panXY:function(){var a=d.create(),b=c.create();return function(e,f){d.transpose(a,this._rotation),this._updateModelViewMat=!0,c.set(b,-e,f,0),c.transformMat4(b,b,a),c.add(b,b,this._center),this.setCenter(b)}}(),nearOffset:function(){return this._near},farOffset:function(){return this._far},setNearFar:function(a,b){(a!==this._near||b!==this._far)&&(this._near=a,this._far=b,this._updateProjectionMat=!0)},setFogNearFar:function(a,b){this._fogNear=a,this._fogFar=b,this._updateProjectionMat=!0},setZoom:function(a){return this._updateModelViewMat=!0,this._zoom=a,this._zoom},zoom:function(a){if(void 0===a)return this._zoom;this._updateModelViewMat=!0;var b=1+.1*a;return this._zoom=Math.min(1e3,Math.max(2,b*this._zoom)),this._zoom},center:function(){return this._center},setFogColor:function(a){this._fogColor=c.clone(a)},currentShader:function(){return this._currentShader},bind:function(a,b){var c=!1,e=this._gl;if(this._currentShader!==a&&(this._currentShader=a,e.useProgram(a),c=!0),c=this._updateIfRequired()||c,b?(d.mul(this._modelView,this._camModelView,b),e.uniformMatrix4fv(a.modelview,!1,this._modelView)):e.uniformMatrix4fv(a.modelview,!1,this._camModelView),this._stateId!==a.stateId){a.stateId=this._stateId,e.uniformMatrix4fv(a.projection,!1,this._projection),a.rotation&&e.uniformMatrix4fv(a.rotation,!1,this._rotation),e.uniform1i(a.fog,this._fog);var f=this._zoom;e.uniform1f(a.fogFar,this._fogFar+f),e.uniform1f(a.fogNear,this._fogNear+f),e.uniform3fv(a.fogColor,this._fogColor),e.uniform3fv(a.outlineColor,this._outlineColor)}}},b}(),i={LINES_FS:"\nprecision ${PRECISION} float;\n\nvarying vec4 vertColor;\nvarying vec3 vertNormal;\nuniform float fogNear;\nuniform float fogFar;\nuniform vec3 fogColor;\nuniform bool fog;\n\nvoid main(void) {\n  gl_FragColor = vec4(vertColor);\n  if (gl_FragColor.a == 0.0) { discard; }\n  float depth = gl_FragCoord.z / gl_FragCoord.w;\n  if (fog) {\n    float fog_factor = smoothstep(fogNear, fogFar, depth);\n    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w),\n                        fog_factor);\n  }\n}",HEMILIGHT_FS:"\nprecision ${PRECISION} float;\n\nvarying vec4 vertColor;\nvarying vec3 vertNormal;\nuniform float fogNear;\nuniform float fogFar;\nuniform vec3 fogColor;\nuniform bool fog;\n\nvoid main(void) {\n  float dp = dot(vertNormal, vec3(0.0, 0.0, 1.0));\n  float hemi = max(0.0, dp)*0.5+0.5;\n  hemi *= vertColor.a;\n  gl_FragColor = vec4(vertColor.rgb*hemi, vertColor.a);\n  if (gl_FragColor.a == 0.0) { discard; }\n  float depth = gl_FragCoord.z / gl_FragCoord.w;\n  if (fog) {\n    float fog_factor = smoothstep(fogNear, fogFar, depth);\n    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w),\n                        fog_factor);\n  }\n}",HEMILIGHT_VS:"\nattribute vec3 attrPos;\nattribute vec4 attrColor;\nattribute vec3 attrNormal;\n\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nvarying vec4 vertColor;\nvarying vec3 vertNormal;\nvoid main(void) {\n  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n  vec4 n = (modelviewMat * vec4(attrNormal, 0.0));\n  vertNormal = n.xyz;\n  vertColor = attrColor;\n}",OUTLINE_FS:"\nprecision ${PRECISION} float;\nvarying float vertAlpha;\n\nuniform vec3 outlineColor;\nuniform float fogNear;\nuniform float fogFar;\nuniform vec3 fogColor;\nuniform bool fog;\n\nvoid main() {\n  gl_FragColor = vec4(outlineColor, vertAlpha);\n  if (gl_FragColor.a == 0.0) { discard; }\n  float depth = gl_FragCoord.z / gl_FragCoord.w;\n  if (fog) { \n    float fog_factor = smoothstep(fogNear, fogFar, depth);\n    gl_FragColor = mix(gl_FragColor, vec4(fogColor, vertAlpha),\n                        fog_factor);\n  }\n}",OUTLINE_VS:"\nprecision ${PRECISION} float;\n\nattribute vec3 attrPos;\nattribute vec3 attrNormal;\nattribute vec4 attrColor;\n                                                                       \nuniform vec3 outlineColor;\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nvarying float vertAlpha;\n\nvoid main(void) {\n  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n  vec4 normal = modelviewMat * vec4(attrNormal, 0.0);\n  vertAlpha = attrColor.a;\n  gl_Position.xy += normal.xy*0.200;\n}",TEXT_VS:"\nprecision ${PRECISION} float;\n\nattribute vec3 attrCenter;\nattribute vec2 attrCorner;\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nuniform mat4 rotationMat;\nvarying vec2 vertTex;\nuniform float width;\nuniform float height;\nvoid main() { \n  vec4 pos = modelviewMat* vec4(attrCenter, 1.0);\n  pos.z += 4.0;\n  gl_Position = projectionMat * pos;\n  gl_Position.xy += vec2(width,height)*attrCorner*gl_Position.w; \n  vertTex = (attrCorner+abs(attrCorner))/(2.0*abs(attrCorner)); \n}",TEXT_FS:"\nprecision ${PRECISION} float;\n\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nuniform sampler2D sampler;\nuniform float xScale;\nuniform float yScale;\nvarying vec2 vertTex;\nvoid main() { \n  vec2 texCoord = vec2(vertTex.x*xScale, vertTex.y*yScale);\n  gl_FragColor = texture2D(sampler, texCoord);\n  if (gl_FragColor.a == 0.0) { discard; }\n}",SELECT_VS:"\nprecision ${PRECISION} float;\nuniform mat4 projectionMat;\nuniform mat4 modelviewMat;\nattribute vec3 attrPos;\nattribute float attrObjId;\n\nvarying float objId;\n\nvoid main(void) {\n  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n  objId = attrObjId;\n}",SELECT_FS:"\nprecision ${PRECISION} float;\n\nvarying float objId;\nuniform int symId;\n\nint intMod(int x, int y) { \n  int z = x/y;\n  return x-y*z;\n}\nvoid main(void) {\n  // ints are only required to be 7bit...\n  int integralObjId = int(objId+0.5);\n  int red = intMod(integralObjId, 256);\n  integralObjId/=256;\n  int green = intMod(integralObjId, 256);\n  integralObjId/=256;\n  int blue = symId;\n  gl_FragColor = vec4(float(red), float(green), float(blue), 255.0)/255.0;\n}"},j=function(){function a(a,b,c){this._element=a,this._element.addEventListener("touchmove",e.bind(this,this._touchMove)),this._element.addEventListener("touchstart",e.bind(this,this._touchStart)),this._element.addEventListener("touchend",e.bind(this,this._touchEnd)),this._element.addEventListener("touchcancel",e.bind(this,this._touchEnd)),this._touchState={scale:1,rotation:0,center:null},this._lastSingleTap=null,this._viewer=b,this._cam=c}function b(a){for(var b=0,c=0,d=0;d<a.length;++d)b+=a[d].clientX,c+=a[d].clientY;return b/=a.length,c/=a.length,{x:b,y:c}}function c(a,b){var c=b.x-a.x,d=b.y-a.y;return Math.sqrt(c*c+d*d)}function d(a,b){var d=c(a[0],a[1]),e=c(b[0],b[1]);return e/(0===d?1:d)}function f(a,b){var c=b.x-a.x,d=b.y-a.y;return Math.atan2(d,c)}function g(a,b){return f(b[1],b[0])-f(a[1],a[0])}return a.prototype={_extractEventAttributes:function(a,c){var e={};e.center=b(c.targetTouches),e.pointers=[];for(var f=0;f<c.targetTouches.length;++f){var h=c.targetTouches[f];e.pointers.push({x:h.clientX,y:h.clientY})}return e.numTouches=c.targetTouches.length,e.rotation=0,e.scale=1,e.deltaScale=0,e.deltaRotation=0,a.center&&(e.deltaCenter={x:e.center.x-a.center.x,y:e.center.y-a.center.y}),2!==a.numTouches||2!==e.numTouches?e:(e.initialPointers=a.initialPointers?a.initialPointers:a.pointers,e.scale=d(e.initialPointers,e.pointers),e.deltaScale=e.scale-a.scale,e.rotation=g(e.initialPointers,e.pointers),e.deltaRotation=e.rotation-a.rotation,e)},_touchMove:function(a){a.preventDefault();var b=this._extractEventAttributes(this._touchState,a),c=4*-b.deltaScale;0!==c&&this._cam.zoom(c),2===b.numTouches&&2===this._touchState.numTouches&&this._cam.panXY(.001*b.deltaCenter.x*this._cam.zoom(),.001*b.deltaCenter.y*this._cam.zoom());var d=-b.deltaRotation;this._cam.rotateZ(d),1===b.numTouches&&1===this._touchState.numTouches&&(this._cam.rotateX(.005*b.deltaCenter.y),this._cam.rotateY(.005*b.deltaCenter.x)),this._viewer.requestRedraw(),this._touchState=b},_touchStart:function(a){if(a.preventDefault(),1===a.targetTouches.length){var b=(new Date).getTime();if(null!==this._lastSingleTap){var c=b-this._lastSingleTap;500>c&&this._viewer._mouseDoubleClick({clientX:a.targetTouches[0].clientX,clientY:a.targetTouches[0].clientY})}this._lastSingleTap=b}else this._lastSingleTap=null;this._touchState=this._extractEventAttributes(this._touchState,a)},_touchEnd:function(a){a.preventDefault()}},a}(),k=function(){function b(a,b,c){return c?a*b:b*(a-1)+1}function c(a,c,d,f,g,h){g=g||!1,f=f||.5;var i=null,j=3*b(c,d,g);i=h?h.request(j):new Float32Array(j);var l,m,n,o=0,p=1/d,q=e.create(),r=e.create(),s=e.create(),t=e.create(),u=e.create(),v=e.create();for(e.set(t,a[0],a[1],a[2]),e.set(u,a[3],a[4],a[5]),g?(e.set(s,a[a.length-3],a[a.length-2],a[a.length-1]),e.sub(q,u,s),e.scale(q,q,f)):(e.set(s,a[0],a[1],a[2]),e.set(q,0,0,0)),l=1,n=c-1;n>l;++l){for(e.set(v,a[3*(l+1)],a[3*(l+1)+1],a[3*(l+1)+2]),e.sub(r,v,t),e.scale(r,r,f),m=0;d>m;++m)k(i,t,q,u,r,p*m,o),o+=3;e.copy(s,t),e.copy(t,u),e.copy(u,v),e.copy(q,r)}for(g?(e.set(v,a[0],a[1],a[3]),e.sub(r,v,t),e.scale(r,r,f)):e.set(r,0,0,0),m=0;d>m;++m)k(i,t,q,u,r,p*m,o),o+=3;if(!g)return i[o]=a[3*(c-1)+0],i[o+1]=a[3*(c-1)+1],i[o+2]=a[3*(c-1)+2],i;for(e.copy(s,t),e.copy(t,u),e.copy(u,v),e.copy(q,r),e.set(v,a[3],a[4],a[5]),e.sub(r,v,t),e.scale(r,r,f),m=0;d>m;++m)k(i,t,q,u,r,p*m,o),o+=3;return i}function d(a,b){this._center=a||e.create(),this._radius=b||1}var e=a.vec3,f=a.mat3,g=a.quat,h=function(){var a=e.create();return function(b,c,d){return e.cross(a,b,c),Math.atan2(e.dot(a,d),e.dot(b,c))}}(),i=function(){var a=e.create();return function(b,c){return e.copy(a,c),Math.abs(c[0])<Math.abs(c[1])?Math.abs(c[0])<Math.abs(c[2])?a[0]+=1:a[2]+=1:Math.abs(c[1])<Math.abs(c[2])?a[1]+=1:a[2]+=1,e.cross(b,c,a)}}(),j=function(a,b,c){var d=Math.sin(c),e=Math.cos(c),f=b[0],g=b[1],h=b[2],i=f*f,j=f*g,k=f*h,l=g*g,m=g*h,n=h*h;return a[0]=i+e-i*e,a[1]=j-e*j-d*h,a[2]=k-e*k+d*g,a[3]=j-e*j+d*h,a[4]=l+e-e*l,a[5]=m-e*m-d*f,a[6]=k-e*k-d*g,a[7]=m-e*m+d*f,a[8]=n+e-e*n,a},k=function(){var a=e.create();return function(b,c,d,f,g,h,i){var j=h*h,k=3-2*h,l=j*k,m=1-l,n=j*(h-2)+h,o=j*(h-1);e.copy(a,c),e.scale(a,a,m),e.scaleAndAdd(a,a,d,n),e.scaleAndAdd(a,a,f,l),e.scaleAndAdd(a,a,g,o),b[i]=a[0],b[i+1]=a[1],b[i+2]=a[2]}}(),l=function(){var a=f.create(),b=f.create(),c=f.create(),d=f.create(),h=g.create(),i=e.create(),j=e.create();return function(k){for(var l=24,m=g.fromValues(0,0,0,1),n=0;l>n;++n){f.fromQuat(a,m);var o=f.transpose(c,a);f.mul(b,a,f.mul(d,k,o)),e.set(i,b[5],b[2],b[1]),e.set(j,Math.abs(i[0]),Math.abs(i[1]),Math.abs(i[2]));var p=j[0]>j[1]&&j[0]>j[2]?0:j[1]>j[2]?1:2,q=(p+1)%3,r=(p+2)%3;if(0===i[p])break;var s=(b[3*r+r]-b[3*q+q])/(2*i[p]),t=s>0?1:-1;s*=t;var u=s+(1e6>s?Math.sqrt(s*s+1):s),v=t/u,w=1/Math.sqrt(v*v+1);if(1===w)break;if(e.set(h,0,0,0,0),h[p]=t*Math.sqrt((1-w)/2),h[p]*=-1,h[3]=Math.sqrt(1-h[p]*h[p]),1===h[3])break;m=g.mul(m,m,h),g.normalize(m,m)}return m}}();d.prototype.center=function(){return this._center},d.prototype.radius=function(){return this._radius};var m=function(){return function(a,b,c,d,f){f?e.cross(d,b,c):i(d,b),e.cross(c,d,b),e.normalize(d,d),e.normalize(c,c),a[0]=c[0],a[1]=c[1],a[2]=c[2],a[3]=d[0],a[4]=d[1],a[5]=d[2],a[6]=b[0],a[7]=b[1],a[8]=b[2]}}();return{signedAngle:h,axisRotation:j,ortho:i,diagonalizer:l,catmullRomSpline:c,cubicHermiteInterpolate:k,catmullRomSplineNumPoints:b,Sphere:d,buildRotation:m}}(),l=function(){function b(a,b){this._arcs=b,this._stacks=a,this._indices=new Uint16Array(3*b*a*2),this._verts=new Float32Array(3*b*a);var c,d,e=Math.PI/(a-1),f=2*Math.PI/b;for(c=0;c<this._stacks;++c){var g=Math.sin(c*e),h=Math.cos(c*e);for(d=0;d<this._arcs;++d){var i=g*Math.cos(d*f),j=g*Math.sin(d*f);this._verts[3*(d+c*this._arcs)]=i,this._verts[3*(d+c*this._arcs)+1]=j,this._verts[3*(d+c*this._arcs)+2]=h}}var k=0;for(c=0;c<this._stacks-1;++c)for(d=0;d<this._arcs;++d)this._indices[k]=c*this._arcs+d,this._indices[k+1]=c*this._arcs+(d+1)%this._arcs,this._indices[k+2]=(c+1)*this._arcs+d,k+=3,this._indices[k]=c*this._arcs+(d+1)%this._arcs,this._indices[k+1]=(c+1)*this._arcs+(d+1)%this._arcs,this._indices[k+2]=(c+1)*this._arcs+d,k+=3}function c(a,b,c){var d=k.catmullRomSpline(a,a.length/3,b,c,!0);this._indices=new Uint16Array(2*d.length),this._verts=d,this._normals=new Float32Array(d.length),this._arcs=d.length/3;for(var f=e.create(),g=0;g<this._arcs;++g){var h=0===g?this._arcs-1:g-1,i=g===this._arcs-1?0:g+1;f[0]=this._verts[3*i+1]-this._verts[3*h+1],f[1]=this._verts[3*h]-this._verts[3*i],e.normalize(f,f),this._normals[3*g]=f[0],this._normals[3*g+1]=f[1],this._normals[3*g+2]=f[2]}for(g=0;g<this._arcs;++g)this._indices[6*g]=g,this._indices[6*g+1]=g+this._arcs,this._indices[6*g+2]=(g+1)%this._arcs+this._arcs,this._indices[6*g+3]=g,this._indices[6*g+4]=(g+1)%this._arcs+this._arcs,this._indices[6*g+5]=(g+1)%this._arcs}function d(a){this._arcs=a,this._indices=new Uint16Array(3*a*2),this._verts=new Float32Array(3*a*2),this._normals=new Float32Array(3*a*2);for(var b=2*Math.PI/this._arcs,c=0;c<this._arcs;++c){var d=Math.cos(b*c),e=Math.sin(b*c);this._verts[3*c]=d,this._verts[3*c+1]=e,this._verts[3*c+2]=-.5,this._verts[3*a+3*c]=d,this._verts[3*a+3*c+1]=e,this._verts[3*a+3*c+2]=.5,this._normals[3*c]=d,this._normals[3*c+1]=e,this._normals[3*a+3*c]=d,this._normals[3*a+3*c+1]=e}for(c=0;c<this._arcs;++c)this._indices[6*c]=c%this._arcs,this._indices[6*c+1]=a+(c+1)%this._arcs,this._indices[6*c+2]=(c+1)%this._arcs,this._indices[6*c+3]=c%this._arcs,this._indices[6*c+4]=a+c%this._arcs,this._indices[6*c+5]=a+(c+1)%this._arcs}var e=a.vec3;return b.prototype={addTransformed:function(){var a=e.create(),b=e.create();return function(c,d,f,g,h){for(var i=c.numVerts(),j=0;j<this._stacks*this._arcs;++j)e.set(b,this._verts[3*j],this._verts[3*j+1],this._verts[3*j+2]),e.copy(a,b),e.scale(a,a,f),e.add(a,a,d),c.addVertex(a,b,g,h);for(j=0;j<this._indices.length/3;++j)c.addTriangle(i+this._indices[3*j],i+this._indices[3*j+1],i+this._indices[3*j+2])}}(),numIndices:function(){return this._indices.length},numVerts:function(){return this._verts.length/3}},c.prototype={addTransformed:function(){var a=e.create(),b=e.create();return function(c,d,f,g,h,i,j,k){for(var l=this._arcs,m=this._normals,n=this._verts,o=c.numVerts()-l,p=0;l>p;++p)e.set(a,f*n[3*p],f*n[3*p+1],0),e.transformMat3(a,a,g),e.add(a,a,d),e.set(b,m[3*p],m[3*p+1],0),e.transformMat3(b,b,g),c.addVertex(a,b,h,k);if(!i)if(0!==j)for(p=0;l>p;++p)c.addTriangle(o+(p+j)%l,o+p+l,o+(p+1)%l+l),c.addTriangle(o+(p+j)%l,o+(p+1)%l+l,o+(p+1+j)%l);else for(p=0;p<this._indices.length/3;++p)c.addTriangle(o+this._indices[3*p],o+this._indices[3*p+1],o+this._indices[3*p+2])}}()},d.prototype={numVerts:function(){return this._verts.length/3},numIndices:function(){return this._indices.length},addTransformed:function(){var a=e.create(),b=e.create();return function(c,d,f,g,h,i,j,k,l){for(var m=c.numVerts(),n=this._verts,o=this._normals,p=this._arcs,q=0;2*p>q;++q){e.set(a,g*n[3*q],g*n[3*q+1],f*n[3*q+2]),e.transformMat3(a,a,h),e.add(a,a,d),e.set(b,o[3*q],o[3*q+1],o[3*q+2]),e.transformMat3(b,b,h);var r=p>q?k:l;c.addVertex(a,b,p>q?i:j,r)}var s=this._indices;for(q=0;q<s.length/3;++q)c.addTriangle(m+s[3*q],m+s[3*q+1],m+s[3*q+2])}}()},{TubeProfile:c,ProtoCylinder:d,ProtoSphere:b}}(),m=M=function(){function a(a){this._children=[],this._visible=!0,this._name=name||"",this._gl=a,this._order=1}return a.prototype={order:function(a){return void 0!==a&&(this._order=a),this._order},add:function(a){this._children.push(a)},draw:function(a,b,c,d){for(var e=0,f=this._children.length;e!==f;++e)this._children[e].draw(a,b,c,d)},show:function(){this._visible=!0},hide:function(){this._visible=!1},name:function(a){return void 0!==a&&(this._name=a),this._name},destroy:function(){for(var a=0;a<this._children.length;++a)this._children[a].destroy()},visible:function(){return this._visible}},a}(),n=P=function(){function b(a,b){a.eachResidue(function(a){var c=a.centralAtom();null!==c&&b(c,c.pos())})}function c(a){M.call(this,a),this._idRanges=[],this._vertAssocs=[],this._showRelated=null}var d=a.vec3,f=function(){var a=d.create();return function(b,c,e){for(var f=0;f<c.length;++f)for(var g=c[f],h=b.chainsByName(g.chains()),i=0;i<g.matrices().length;++i)for(var j=g.matrix(i),k=0;k<h.length;++k)for(var l=h[k],m=0;m<l.residues().length;++m){var n=l.residues()[m].centralAtom();null!==n&&(d.transformMat4(a,n.pos(),j),e(n,a))}}}();return e.derive(c,M,{setShowRelated:function(a){return a&&"asym"!==a&&null===this.structure().assembly(a)?void 0:(this._showRelated=a,a)},symWithIndex:function(a){if("asym"===this.showRelated())return null;var b=this.structure().assembly(this.showRelated());if(!b)return null;for(var c=b.generators(),d=0;d<c.length;++d){if(c[d].matrices().length>a)return c[d].matrix(a);a-=c[d].matrices().length}return null},showRelated:function(){return this._showRelated},select:function(a){return this.structure().select(a)},structure:function(){return this._vertAssocs[0]._structure},getColorForAtom:function(a,b){return this._vertAssocs[0].getColorForAtom(a,b)},addIdRange:function(a){this._idRanges.push(a)},destroy:function(){M.prototype.destroy.call(this);for(var a=0;a<this._idRanges.length;++a)this._idRanges[a].recycle()},eachCentralAtom:function(a){var c=this,d=c.structure(),e=d.assembly(c.showRelated());return null===e?b(d,a):f(d,e.generators(),a)},addVertAssoc:function(a){this._vertAssocs.push(a)},_vertArraysInvolving:function(a){for(var b=this.vertArrays(),c=[],d={},e=0;e<a.length;++e)d[a[e]]=!0;for(var f=0;f<b.length;++f)d[b[f].chain()]===!0&&c.push(b[f]);return c},_drawSymmetryRelated:function(a,b,c){for(var d=c.generators(),e=0;e<d.length;++e){var f=d[e],g=this._vertArraysInvolving(f.chains());this._drawVertArrays(a,b,g,f.matrices())}},_updateProjectionIntervalsAsym:function(a,b,c,d,e,f){for(var g=this.vertArrays(),h=0;h<g.length;++h)g[h].updateProjectionIntervals(a,b,c,d,e,f)},updateProjectionIntervals:function(a,b,c,d,e,f){if(this._visible){var g=this.showRelated();if("asym"===g)return this._updateProjectionIntervalsAsym(a,b,c,d,e,f);for(var h=this.structure().assembly(g),i=h.generators(),j=0;j<i.length;++j)for(var k=i[j],l=this._vertArraysInvolving(k.chains()),m=0;m<k.matrices().length;++m)for(var n=0;n<l.length;++n){var o=k.matrix(m);l[n].updateProjectionIntervals(a,b,c,d,e,f,o)}}},_updateSquaredSphereRadiusAsym:function(a,b){for(var c=this.vertArrays(),d=0;d<c.length;++d)b=c[d].updateSquaredSphereRadius(a,b);return b},updateSquaredSphereRadius:function(a,b){if(!this._visible)return b;var c=this.showRelated();if("asym"===c)return this._updateSquaredSphereRadiusAsym(a,b);for(var d=this.structure().assembly(c),e=d.generators(),f=0;f<e.length;++f)for(var g=e[f],h=this._vertArraysInvolving(g.chains()),i=0;i<g.matrices().length;++i)for(var j=0;j<h.length;++j)b=h[j].updateSquaredSphereRadius(a,b);return b},draw:function(a,b,c,d){if(this._visible){var e=this.shaderForStyleAndPass(b,c,d);if(e){var f=this.showRelated();if("asym"===f)return this._drawVertArrays(a,e,this.vertArrays(),null);var g=this.structure().assembly(f);return this._drawSymmetryRelated(a,e,g)}}},colorBy:function(a,b){this._ready=!1,b=b||this.structure();for(var c=0;c<this._vertAssocs.length;++c)this._vertAssocs[c].recolor(a,b)},setOpacity:function(a,b){this._ready=!1,b=b||this.structure();for(var c=0;c<this._vertAssocs.length;++c)this._vertAssocs[c].setOpacity(a,b)}}),c}(),o=N=function(){function b(a,b,c){this._gl=a,this._vertBuffer=a.createBuffer(),this._float32Allocator=c||null,this._ready=!1,this._boundingSphere=null;var d=this._FLOATS_PER_VERT*b;this._vertData=c.request(d)}var c=a.vec3;return b.prototype={setColor:function(a,b,c,d,e){var f=a*this._FLOATS_PER_VERT+this._COLOR_OFFSET;this._vertData[f+0]=b,this._vertData[f+1]=c,this._vertData[f+2]=d,this._vertData[f+3]=e,this._ready=!1},getColor:function(a,b){var c=a*this._FLOATS_PER_VERT+this._COLOR_OFFSET;return b[0]=this._vertData[c+0],b[1]=this._vertData[c+1],b[2]=this._vertData[c+2],b[3]=this._vertData[c+3],b},setOpacity:function(a,b){var c=a*this._FLOATS_PER_VERT+this._COLOR_OFFSET;this._vertData[c+3]=b,this._ready=!1},boundingSphere:function(){return this._boundingSphere||(this._boundingSphere=this._calculateBoundingSphere()),this._boundingSphere},_calculateBoundingSphere:function(){var a=this.numVerts();if(0===a)return null;var b,d,e=c.create();for(d=0;a>d;++d)b=d*this._FLOATS_PER_VERT,e[0]+=this._vertData[b+0],e[1]+=this._vertData[b+1],e[2]+=this._vertData[b+2];c.scale(e,e,1/a);var f=0;for(d=0;a>d;++d){b=d*this._FLOATS_PER_VERT;var g=e[0]-this._vertData[b+0],h=e[1]-this._vertData[b+1],i=e[2]-this._vertData[b+2];f=Math.max(f,g*g+h*h+i*i)}return new k.Sphere(e,Math.sqrt(f))},destroy:function(){this._gl.deleteBuffer(this._vertBuffer),this._float32Allocator.release(this._vertData)},bindBuffers:function(){this._gl.bindBuffer(this._gl.ARRAY_BUFFER,this._vertBuffer),this._ready||(this._gl.bufferData(this._gl.ARRAY_BUFFER,this._vertData,this._gl.STATIC_DRAW),this._ready=!0)},updateSquaredSphereRadius:function(){var a=c.create();return function(b,d,e){var f=this.boundingSphere();if(!f)return d;if(e)return c.transformMat4(a,f.center(),e),Math.max(c.sqrDist(a,b),d);var g=f.radius()*f.radius();return Math.max(c.sqrDist(f.center(),b)+g,d)}}(),updateProjectionIntervals:function(){var a=c.create();return function(b,d,e,f,g,h,i){var j=this.boundingSphere();if(j){i?c.transformMat4(a,j.center(),i):c.copy(a,j.center());var k=c.dot(b,a),l=c.dot(d,a),m=c.dot(e,a);f.update(k-j.radius()),f.update(k+j.radius()),g.update(l-j.radius()),g.update(l+j.radius()),h.update(m-j.radius()),h.update(m+j.radius())}}}()},b}(),p=function(){function a(a,b,c){N.call(this,a,b,c),this._numLines=0}return e.derive(a,N,{_FLOATS_PER_VERT:8,_POS_OFFSET:0,_COLOR_OFFSET:3,_ID_OFFSET:7,numVerts:function(){return 2*this._numLines},addLine:function(a,b,c,d,e,f){var g=this._FLOATS_PER_VERT*this._numLines*2;this._vertData[g++]=a[0],this._vertData[g++]=a[1],this._vertData[g++]=a[2],this._vertData[g++]=b[0],this._vertData[g++]=b[1],this._vertData[g++]=b[2],this._vertData[g++]=b[3],this._vertData[g++]=e,this._vertData[g++]=c[0],this._vertData[g++]=c[1],this._vertData[g++]=c[2],this._vertData[g++]=d[0],this._vertData[g++]=d[1],this._vertData[g++]=d[2],this._vertData[g++]=d[3],this._vertData[g++]=f,this._numLines+=1,this._ready=!1,this._boundingSpehre=null},bindAttribs:function(a){this._gl.vertexAttribPointer(a.posAttrib,3,this._gl.FLOAT,!1,4*this._FLOATS_PER_VERT,4*this._POS_OFFSET),-1!==a.colorAttrib&&(this._gl.vertexAttribPointer(a.colorAttrib,4,this._gl.FLOAT,!1,4*this._FLOATS_PER_VERT,4*this._COLOR_OFFSET),this._gl.enableVertexAttribArray(a.colorAttrib)),this._gl.enableVertexAttribArray(a.posAttrib),-1!==a.objIdAttrib&&(this._gl.vertexAttribPointer(a.objIdAttrib,1,this._gl.FLOAT,!1,4*this._FLOATS_PER_VERT,4*this._ID_OFFSET),this._gl.enableVertexAttribArray(a.objIdAttrib))},releaseAttribs:function(a){this._gl.disableVertexAttribArray(a.posAttrib),-1!==a.colorAttrib&&this._gl.disableVertexAttribArray(a.colorAttrib),-1!==a.objIdAttrib&&this._gl.disableVertexAttribArray(a.objIdAttrib)},bind:function(a){this.bindBuffers(),this.bindAttribs(a)},draw:function(){this._gl.drawArrays(this._gl.LINES,0,2*this._numLines)}}),a}(),q=O=function(){function a(a,b,c,d,e){N.call(this,a,b,d),this._indexBuffer=a.createBuffer(),this._uint16Allocator=e,this._numVerts=0,this._maxVerts=b,this._numTriangles=0,this._indexData=e.request(c)}return e.derive(a,N,{destroy:function(){N.prototype.destroy.call(this),this._gl.deleteBuffer(this._indexBuffer),this._uint16Allocator.release(this._indexData)},setIndexData:function(a){this._ready=!1,this._numTriangles=a.length/3;for(var b=0;b<a.length;++b)this._indexData[b]=a[b]},setVertData:function(a){this._ready=!1,this._numVerts=a.length/this._FLOATS_PER_VERT;for(var b=0;b<a.length;++b)this._vertData[b]=a[b]},numVerts:function(){return this._numVerts},maxVerts:function(){return this._maxVerts},numIndices:function(){return 3*this._numTriangles},addVertex:function(a,b,c,d){var e=this._numVerts*this._FLOATS_PER_VERT;this._vertData[e++]=a[0],this._vertData[e++]=a[1],this._vertData[e++]=a[2],this._vertData[e++]=b[0],this._vertData[e++]=b[1],this._vertData[e++]=b[2],this._vertData[e++]=c[0],this._vertData[e++]=c[1],this._vertData[e++]=c[2],this._vertData[e++]=c[3],this._vertData[e++]=d,this._numVerts+=1,this._ready=!1},_FLOATS_PER_VERT:11,_BYTES_PER_VERT:44,_OBJID_OFFSET:10,_OBJID_BYTE_OFFSET:40,_COLOR_OFFSET:6,_COLOR_BYTE_OFFSET:24,_NORMAL_OFFSET:3,_NORMAL_BYTE_OFFSET:12,_POS_OFFSET:0,_POS_BYTE_OFFSET:0,addTriangle:function(a,b,c){var d=3*this._numTriangles;d+2>=this._indexData.length||(this._indexData[d++]=a,this._indexData[d++]=b,this._indexData[d++]=c,this._numTriangles+=1,this._ready=!1)},bindBuffers:function(){var a=this._ready,b=this._gl;N.prototype.bindBuffers.call(this),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indexBuffer),a||b.bufferData(b.ELEMENT_ARRAY_BUFFER,this._indexData,b.STATIC_DRAW)},bindAttribs:function(a){var b=this._gl,c=this._BYTES_PER_VERT;b.enableVertexAttribArray(a.posAttrib),b.vertexAttribPointer(a.posAttrib,3,b.FLOAT,!1,c,this._POS_BYTE_OFFSET),-1!==a.normalAttrib&&(b.enableVertexAttribArray(a.normalAttrib),b.vertexAttribPointer(a.normalAttrib,3,b.FLOAT,!1,c,this._NORMAL_BYTE_OFFSET)),-1!==a.colorAttrib&&(b.vertexAttribPointer(a.colorAttrib,4,b.FLOAT,!1,c,this._COLOR_BYTE_OFFSET),b.enableVertexAttribArray(a.colorAttrib)),-1!==a.objIdAttrib&&(b.vertexAttribPointer(a.objIdAttrib,1,b.FLOAT,!1,c,this._OBJID_BYTE_OFFSET),b.enableVertexAttribArray(a.objIdAttrib))},releaseAttribs:function(a){var b=this._gl;b.disableVertexAttribArray(a.posAttrib),-1!==a.colorAttrib&&b.disableVertexAttribArray(a.colorAttrib),-1!==a.normalAttrib&&b.disableVertexAttribArray(a.normalAttrib),-1!==a.objIdAttrib&&b.disableVertexAttribArray(a.objIdAttrib)},bind:function(a){this.bindBuffers(),this.bindAttribs(a)},draw:function(){var a=this._gl;a.drawElements(a.TRIANGLES,3*this._numTriangles,a.UNSIGNED_SHORT,0)}}),a}(),r=function(a){function b(b,c,d,e){a.call(this,c,d,e),this._chain=b}function c(a,b,c,d,e,f){O.call(this,b,c,d,e,f),this._chain=a}return e.derive(b,a,{chain:function(){return this._chain},drawSymmetryRelated:function(a,b,c){this.bind(b);for(var d=0;d<c.length;++d)a.bind(b,c[d]),this._gl.uniform1i(b.symId,d),this.draw();this.releaseAttribs(b)}}),e.derive(c,O,{chain:function(){return this._chain}}),c.prototype.drawSymmetryRelated=b.prototype.drawSymmetryRelated,{LineChainData:b,MeshChainData:c}}(p),s=function(a,b){function c(a,b,c){P.call(this,a),this._indexedVAs=[],this._float32Allocator=b,this._uint16Allocator=c,this._remainingVerts=null,this._remainingIndices=null}var d=a.MeshChainData;return e.derive(c,P,{_boundedVertArraySize:function(a){return Math.min(65536,a)},addChainVertArray:function(a,b,c){this._remainingVerts=b,this._remainingIndices=c;var e=new d(a.name(),this._gl,this._boundedVertArraySize(b),c,this._float32Allocator,this._uint16Allocator);return this._indexedVAs.push(e),e},addVertArray:function(a,c){this._remainingVerts=a,this._remainingIndices=c;var d=new b(this._gl,this._boundedVertArraySize(a),c,this._float32Allocator,this._uint16Allocator);return this._indexedVAs.push(d),d},vertArrayWithSpaceFor:function(a){var c=this._indexedVAs[this._indexedVAs.length-1],e=c.maxVerts()-c.numVerts();if(e>=a)return c;this._remainingVerts=this._remainingVerts-c.numVerts(),this._remainingIndices=this._remainingIndices-c.numIndices(),a=this._boundedVertArraySize(this._remainingVerts);var f=null;return f=c instanceof d?new d(c.chain(),this._gl,a,this._remainingIndices,this._float32Allocator,this._uint16Allocator):new b(this._gl,a,this._remainingIndices,this._float32Allocator,this._uint16Allocator),this._indexedVAs.push(f),f
},vertArray:function(a){return this._indexedVAs[a]},destroy:function(){P.prototype.destroy.call(this);for(var a=0;a<this._indexedVAs.length;++a)this._indexedVAs[a].destroy();this._indexedVAs=[]},numVerts:function(){return this._indexedVAs[0].numVerts()},shaderForStyleAndPass:function(a,b,c){if("normal"===c)return a.hemilight;if("select"===c)return a.select;if("outline"===c)return a.outline;var d=a[c];return void 0!==d?d:null},_drawVertArrays:function(a,b,c,d){var e;if(d)for(e=0;e<c.length;++e)c[e].drawSymmetryRelated(a,b,d);else for(a.bind(b),this._gl.uniform1i(b.symId,255),e=0;e<c.length;++e)c[e].bind(b),c[e].draw(),c[e].releaseAttribs(b)},vertArrays:function(){return this._indexedVAs},addVertex:function(a,b,c,d){var e=this._indexedVAs[0];e.addVertex(a,b,c,d)},addTriangle:function(a,b,c){var d=this._indexedVAs[0];d.addTriangle(a,b,c)}}),c}(r,q),t=function(a){function b(a,b){P.call(this,a),this._vertArrays=[],this._float32Allocator=b,this._lineWidth=1}var c=a.LineChainData;return e.derive(b,P,{addChainVertArray:function(a,b){var d=new c(a.name(),this._gl,b,this._float32Allocator);return this._vertArrays.push(d),d},setLineWidth:function(a){this._lineWidth=a},vertArrays:function(){return this._vertArrays},shaderForStyleAndPass:function(a,b,c){return"outline"===c?null:"select"===c?a.select:a.lines},destroy:function(){P.prototype.destroy.call(this);for(var a=0;a<this._vertArrays.length;++a)this._vertArrays[a].destroy();this._vertArrays=[]},_drawVertArrays:function(a,b,c,d){this._gl.lineWidth(this._lineWidth*a.upsamplingFactor());var e;if(d)for(e=0;e<c.length;++e)c[e].drawSymmetryRelated(a,b,d);else for(this._gl.uniform1i(b.symId,255),a.bind(b),e=0;e<c.length;++e)c[e].bind(b),c[e].draw(),c[e].releaseAttribs(b)},vertArray:function(){return this._va}}),b}(r),u=function(){function a(a,b){this._structure=a,this._assocs=[],this._callBeginEnd=b}function c(a,b,c){this._structure=a,this._assocs=[],this._callBeginEnd=c,this._interpolation=b||1,this._perResidueColors={}}return a.prototype={addAssoc:function(a,b,c,d){this._assocs.push({atom:a,vertexArray:b,vertStart:c,vertEnd:d})},recolor:function(a,b){var c=new Float32Array(4*b.atomCount());this._callBeginEnd&&a.begin(this._structure);var d={};b.eachAtom(function(b,e){d[b.index()]=e,a.colorFor(b,c,4*e)}),this._callBeginEnd&&a.end(this._structure);for(var e=0;e<this._assocs.length;++e){var f=this._assocs[e],g=d[f.atom.index()];if(void 0!==g)for(var h=c[4*g+0],i=c[4*g+1],j=c[4*g+2],k=c[4*g+3],l=f.vertexArray,m=f.vertStart;m<f.vertEnd;++m)l.setColor(m,h,i,j,k)}},getColorForAtom:function(a,b){for(var c=0;c<this._assocs.length;++c){var d=this._assocs[c];if(d.atom.full()===a.full())return d.vertexArray.getColor(d.vertStart,b)}return null},setOpacity:function(a,b){var c={};b.eachAtom(function(a){c[a.index()]=!0});for(var d=0;d<this._assocs.length;++d){var e=this._assocs[d],f=c[e.atom.index()];if(f===!0)for(var g=e.vertexArray,h=e.vertStart;h<e.vertEnd;++h)g.setOpacity(h,a)}}},c.prototype={setPerResidueColors:function(a,b){this._perResidueColors[a]=b},addAssoc:function(a,b,c,d,e){this._assocs.push({traceIndex:a,slice:c,vertStart:d,vertEnd:e,vertexArray:b})},recolor:function(a,c){this._callBeginEnd&&a.begin(this._structure);var d,e,f=[],g=this._structure.backboneTraces();for(d=0;d<g.length;++d){var h=this._perResidueColors[d],i=0,j=g[d];for(e=0;e<j.length();++e)c.containsResidue(j.residueAt(e))?(a.colorFor(j.centralAtomAt(e),h,i),i+=4):i+=4;f.push(this._interpolation>1?b.interpolateColor(h,this._interpolation):h)}for(d=0;d<this._assocs.length;++d){var k=this._assocs[d],l=k.slice,m=f[k.traceIndex],n=m[4*l],o=m[4*l+1],p=m[4*l+2],q=m[4*l+3],r=k.vertexArray;for(e=k.vertStart;e<k.vertEnd;++e)r.setColor(e,n,o,p,q)}this._callBeginEnd&&a.end(this._structure)},getColorForAtom:function(a,b){var c,d,e=this._structure.backboneTraces(),f=a.full().residue();for(c=0;c<e.length;++c){var g=this._perResidueColors[c],h=0,i=e[c];for(d=0;d<i.length();++d){if(f===i.residueAt(d).full())return b[0]=g[h+0],b[1]=g[h+1],b[2]=g[h+2],b[3]=g[h+3],b;h+=4}}return null},setOpacity:function(a,c){var d,e,f=[],g=this._structure.backboneTraces();for(d=0;d<g.length;++d){var h=this._perResidueColors[d],i=0,j=g[d];for(e=0;e<j.length();++e)c.containsResidue(j.residueAt(e))?(h[i+3]=a,i+=4):i+=4;f.push(this._interpolation>1?b.interpolateColor(h,this._interpolation):h)}for(d=0;d<this._assocs.length;++d){var k=this._assocs[d],l=k.slice,m=f[k.traceIndex],n=m[4*l+3],o=k.vertexArray;for(e=k.vertStart;e<k.vertEnd;++e)o.setOpacity(e,n)}}},{TraceVertexAssoc:c,AtomVertexAssoc:a}}(),v=function(c,d,e,f){function g(a,b,c){for(var d=0;c-1>d;++d)a.addTriangle(b,b+1+d,b+2+d);a.addTriangle(b,b+c,b+1)}function h(a,b,c){for(var d=b+c,e=0;c-1>e;++e)a.addTriangle(d,b+e+1,b+e);a.addTriangle(d,b,b+c-1)}var i=a.vec3,j=a.vec4,l=a.mat3,m=c.TubeProfile,n=c.ProtoSphere,o=c.ProtoCylinder,p=f.TraceVertexAssoc,q=f.AtomVertexAssoc,r=b.interpolateColor,s={},t=.7071,u=[-t,-t,0,t,-t,0,t,t,0,-t,t,0],v=[-6*t,-1*t,0,6*t,-1*t,0,6*t,1*t,0,-6*t,1*t,0],w=[-10*t,-1*t,0,10*t,-1*t,0,10*t,1*t,0,-10*t,1*t,0],x=function(){var a=i.create(),b=i.create(),c=i.create();return function(d,e,f,g){e=Math.max(e,1),f=Math.min(g-1,f);var h=3*(e-1);i.set(a,d[h],d[h+1],d[h+2]),i.set(c,d[3*e],d[3*e+1],d[3*e+2]);for(var j=e;f>j;++j)h=3*(j+1),i.set(b,d[h],d[h+1],d[h+2]),d[3*j+0]=.25*b[0]+.5*c[0]+.25*a[0],d[3*j+1]=.25*b[1]+.5*c[1]+.25*a[1],d[3*j+2]=.25*b[2]+.5*c[2]+.25*a[2],i.copy(a,c),i.copy(c,b)}}(),y=function(){var a=j.fromValues(0,0,0,1);return function(b,c,d,e){var f=e.atomCount(),g=d.idPool.getContinuousRange(f),h=d.protoSphere.numVerts(),i=d.protoSphere.numIndices(),j=1.5*d.radiusMultiplier;b.addIdRange(g),b.addChainVertArray(e,h*f,i*f),e.eachAtom(function(e){var f=b.vertArrayWithSpaceFor(h);d.color.colorFor(e,a,0);var i=f.numVerts(),k=g.nextId({geom:b,atom:e});d.protoSphere.addTransformed(f,e.pos(),j,a,k);var l=f.numVerts();c.addAssoc(e,f,i,l)})}}();s.spheres=function(a,b,c){var e=new n(c.sphereDetail,c.sphereDetail);c.protoSphere=e;var f=new d(b,c.float32Allocator,c.uint16Allocator),g=new q(a,!0);return f.addVertAssoc(g),f.setShowRelated(c.showRelated),c.color.begin(a),a.eachChain(function(a){y(f,g,c,a)}),c.color.end(a),f};var z=function(){var a=i.create(),b=i.create(),c=j.fromValues(0,0,0,1),d=i.create(),e=i.create(),f=l.create();return function(g,h,j,l){var m=l.atomCount(),n=0;l.eachAtom(function(a){n+=a.bonds().length});var o=m*j.protoSphere.numVerts()+n*j.protoCyl.numVerts(),p=m*j.protoSphere.numIndices()+n*j.protoCyl.numIndices();g.addChainVertArray(l,o,p);var q=j.idPool.getContinuousRange(m);g.addIdRange(q),l.eachAtom(function(l){var m=j.protoSphere.numVerts()+l.bondCount()*j.protoCyl.numVerts(),n=g.vertArrayWithSpaceFor(m),o=n.numVerts(),p=q.nextId({geom:g,atom:l});j.color.colorFor(l,c,0),j.protoSphere.addTransformed(n,l.pos(),j.radius,c,p),l.eachBond(function(g){g.mid_point(a),i.sub(b,l.pos(),a);var h=i.length(b);i.scale(b,b,1/h),k.buildRotation(f,b,d,e,!1),i.add(a,a,l.pos()),i.scale(a,a,.5),j.protoCyl.addTransformed(n,a,h,j.radius,f,c,c,p,p)});var r=n.numVerts();h.addAssoc(l,n,o,r)})}}();s.ballsAndSticks=function(a,b,c){var e=new q(a,!0),f=new n(c.sphereDetail,c.sphereDetail),g=new o(c.arcDetail);c.protoSphere=f,c.protoCyl=g;var h=new d(b,c.float32Allocator,c.uint16Allocator);return h.addVertAssoc(e),h.setShowRelated(c.showRelated),c.color.begin(a),a.eachChain(function(a){z(h,e,c,a)}),c.color.end(a),h};var A=function(){var a=i.create(),b=j.fromValues(0,0,0,1);return function(c,d,e,f){var g=0,h=e.atomCount(),i=f.idPool.getContinuousRange(h);c.addIdRange(i),e.eachAtom(function(a){var b=a.bonds().length;g+=b?b:3});var j=c.addChainVertArray(e,2*g);e.eachAtom(function(e){var g=j.numVerts(),h=i.nextId({geom:c,atom:e});if(e.bonds().length)e.eachBond(function(c){c.mid_point(a),f.color.colorFor(e,b,0),j.addLine(e.pos(),b,a,b,h,h)});else{var k=.2,l=e.pos();f.color.colorFor(e,b,0),j.addLine([l[0]-k,l[1],l[2]],b,[l[0]+k,l[1],l[2]],b,h,h),j.addLine([l[0],l[1]-k,l[2]],b,[l[0],l[1]+k,l[2]],b,h,h),j.addLine([l[0],l[1],l[2]-k],b,[l[0],l[1],l[2]+k],b,h,h)}var m=j.numVerts();d.addAssoc(e,j,g,m)})}}();s.lines=function(a,b,c){var d=new q(a,!0);c.color.begin(a);var f=new e(b,c.float32Allocator);return f.setLineWidth(c.lineWidth),f.addVertAssoc(d),f.setShowRelated(c.showRelated),a.eachChain(function(a){A(f,d,a,c)}),c.color.end(a),f};var B=function(a){for(var b=0,c=0;c<a.length;++c)b+=2*(a[c].length()-1);return b},C=function(){var a=j.fromValues(0,0,0,1),b=j.fromValues(0,0,0,1),c=i.create(),d=i.create();return function(e,f,g,h,i,j){f.addAssoc(h,g,0,g.numVerts(),g.numVerts()+1);var k,l=j.float32Allocator.request(4*i.length()),m=j.idPool.getContinuousRange(i.length()),n=m.nextId({geom:e,atom:i.centralAtomAt(0)});e.addIdRange(m);for(var o=1;o<i.length();++o){j.color.colorFor(i.centralAtomAt(o-1),a,0),l[4*(o-1)+0]=a[0],l[4*(o-1)+1]=a[1],l[4*(o-1)+2]=a[2],l[4*(o-1)+3]=a[3],j.color.colorFor(i.centralAtomAt(o),b,0),i.posAt(c,o-1),i.posAt(d,o),k=m.nextId({geom:e,atom:i.centralAtomAt(o)}),g.addLine(c,a,d,b,n,k),n=k,k=null;var p=g.numVerts();f.addAssoc(h,g,o,p-1,p+(o===i.length()-1?0:1))}return l[4*i.length()-4]=b[0],l[4*i.length()-3]=b[1],l[4*i.length()-2]=b[2],l[4*i.length()-1]=b[3],f.setPerResidueColors(h,l),h+1}}(),D=function(a,b,c,d,e){for(var f=e.backboneTraces(),g=B(f),h=a.addChainVertArray(e,g),i=0;i<f.length;++i)d=C(a,b,h,d,f[i],c);return d};s.lineTrace=function(a,b,c){var d=new p(a,1,!0);c.color.begin(a);var f=new e(b,c.float32Allocator);f.setLineWidth(c.lineWidth);var g=0;return a.eachChain(function(a){g=D(f,d,c,g,a)}),f.addVertAssoc(d),f.setShowRelated(c.showRelated),c.color.end(a),f};var E=function(a,b){for(var c=0,d=0;d<a.length;++d)c+=2*(b*(a[d].length()-1)+1);return c},F=function(){var a=i.create(),b=i.create(),c=j.fromValues(0,0,0,1),d=j.fromValues(0,0,0,1);return function(e,f,g,h,i,j){var l,m=j.fullTraceIndex(0),n=h.float32Allocator.request(3*j.length()),o=h.float32Allocator.request(4*j.length()),p=[],q=h.idPool.getContinuousRange(j.length());for(e.addIdRange(q),l=0;l<j.length();++l){var s=j.centralAtomAt(l);j.smoothPosAt(a,l,h.strength),h.color.colorFor(s,o,4*l),n[3*l]=a[0],n[3*l+1]=a[1],n[3*l+2]=a[2],p.push(q.nextId({geom:e,atom:s}))}var t=p[0],u=0,v=k.catmullRomSpline(n,j.length(),h.splineDetail,h.strength,!1,h.float32Allocator),w=r(o,h.splineDetail),x=g.numVerts();f.addAssoc(i,g,m,x,x+1);var y=Math.floor(h.splineDetail/2),z=k.catmullRomSplineNumPoints(j.length(),h.splineDetail,!1);for(l=1;z>l;++l){a[0]=v[3*(l-1)],a[1]=v[3*(l-1)+1],a[2]=v[3*(l-1)+2],b[0]=v[3*(l-0)],b[1]=v[3*(l-0)+1],b[2]=v[3*(l-0)+2],c[0]=w[4*(l-1)+0],c[1]=w[4*(l-1)+1],c[2]=w[4*(l-1)+2],c[3]=w[4*(l-1)+3],d[0]=w[4*(l-0)+0],d[1]=w[4*(l-0)+1],d[2]=w[4*(l-0)+2],d[3]=w[4*(l-0)+3];var A=Math.floor((l+y)/h.splineDetail);u=p[Math.min(p.length-1,A)],g.addLine(a,c,b,d,t,u),t=u;var B=g.numVerts();f.addAssoc(i,g,m+l,B-1,B+(l===j.length-1?0:1))}return f.setPerResidueColors(i,o),h.float32Allocator.release(n),h.float32Allocator.release(v),i+1}}(),G=function(a,b,c,d,e){for(var f=d.backboneTraces(),g=E(f,c.splineDetail),h=a.addChainVertArray(d,g),i=0;i<f.length;++i)e=F(a,b,h,c,e,f[i]);return e};s.sline=function(a,b,c){c.color.begin(a);var d=new p(a,c.splineDetail,1,!0),f=new e(b,c.float32Allocator);f.addVertAssoc(d),f.setLineWidth(c.lineWidth),f.setShowRelated(c.showRelated);var g=0;return a.eachChain(function(a){g=G(f,d,c,a,g)}),c.color.end(a),f};var H=function(a,b,c){for(var d=0,e=0;e<a.length;++e)d+=a[e].length()*b,d+=(a[e].length()-1)*c;return d},I=function(a,b,c){for(var d=0,e=0;e<a.length;++e)d+=a[e].length()*b,d+=(a[e].length()-1)*c;return d},J=function(a,b,c,d,e){var f=e.backboneTraces(),g=H(f,c.protoSphere.numVerts(),c.protoCyl.numVerts()),h=I(f,c.protoSphere.numIndices(),c.protoCyl.numIndices());a.addChainVertArray(e,g,h);for(var i=0;i<f.length;++i)R(a,b,f[i],d,c),d++;return d};s.trace=function(a,b,c){c.protoCyl=new o(c.arcDetail),c.protoSphere=new n(c.sphereDetail,c.sphereDetail);var e=new d(b,c.float32Allocator,c.uint16Allocator),f=new p(a,1,!0);e.addVertAssoc(f),e.setShowRelated(c.showRelated),c.color.begin(a);var g=0;return a.eachChain(function(a){g=J(e,f,c,g,a)}),c.color.end(a),e};var K=function(a,b,c){for(var d=0,e=0;e<a.length;++e)d+=((a[e].length()-1)*c+1)*b,d+=2;return d},L=function(a,b,c){for(var d=0,e=0;e<a.length;++e)d+=(a[e].length()*c-1)*b*6,d+=6*b;return d},M=function(){var a=l.create(),b=i.create(),c=i.create(),d=i.create(),e=i.create(),f=j.create();return function(g,h,j,l){for(var m=1.8*l.radius,n=0;n<j.length;++n)for(var o=j[n],p=l.idPool.getContinuousRange(o.length()),q=0;q<o.length();++q){var r=l.protoCyl.numVerts(),s=g.vertArrayWithSpaceFor(r),t=s.numVerts(),u=o.residueAt(q),v=u.name(),w=u.atom("C3'"),x=null;if(x=u.atom("A"===v||"G"===v||"DA"===v||"DG"===v?"N1":"N3"),null!==x&&null!==w){var y=p.nextId({geom:g,atom:x});i.add(e,w.pos(),x.pos()),i.scale(e,e,.5),l.color.colorFor(x,f,0),i.sub(d,x.pos(),w.pos());var z=i.length(d);i.scale(d,d,1/z),k.buildRotation(a,d,c,b,!1),l.protoCyl.addTransformed(s,e,z,m,a,f,f,y,y),l.protoSphere.addTransformed(s,x.pos(),m,f,y),l.protoSphere.addTransformed(s,w.pos(),m,f,y);var A=s.numVerts();h.addAssoc(x,s,t,A)}}}}(),N=function(a,b,c,d,e,f){for(var g=f.backboneTraces(),h=K(g,4*d.arcDetail,d.splineDetail),i=L(g,4*d.arcDetail,d.splineDetail),j=[],k=d.protoCyl.numVerts()+2*d.protoSphere.numVerts(),l=d.protoCyl.numIndices()+2*d.protoSphere.numIndices(),m=0;m<g.length;++m){var n=g[m];n.residueAt(0).isNucleotide()&&(j.push(n),h+=n.length()*k,i+=n.length()*l)}a.addChainVertArray(f,h,i);for(var o=0;o<g.length;++o)Q(a,b,g[o],e,d),e++;return M(a,c,j,d),e};s.cartoon=function(a,b,c){c.arrowSkip=Math.floor(3*c.splineDetail/4),c.coilProfile=new m(u,c.arcDetail,1),c.helixProfile=new m(v,c.arcDetail,.1),c.strandProfile=new m(v,c.arcDetail,.1),c.arrowProfile=new m(w,c.arcDetail,.1),c.protoCyl=new o(4*c.arcDetail),c.protoSphere=new n(4*c.arcDetail,4*c.arcDetail);var e=new d(b,c.float32Allocator,c.uint16Allocator),f=new p(a,c.splineDetail,!0);e.addVertAssoc(f),e.setShowRelated(c.showRelated),c.color.begin(a);var g=0,h=a.select({anames:["N1","N3"]}),i=new q(h,!0);return e.addVertAssoc(i),a.eachChain(function(a){g=N(e,f,i,c,g,a)}),c.color.end(a),e},s.surface=function(){var a=i.create(),b=i.create(),c=j.fromValues(.8,.8,.8,1);return function(e,f,g){var h=0;e.getUint32(0),h+=4;var j=e.getUint32(h);h+=4;var k=24,l=k*j+h,m=e.getUint32(l),n=new d(f,g.float32Allocator,g.uint16Allocator);n.setShowRelated("asym");var o,p=n.addVertArray(j,3*m);for(o=0;j>o;++o)i.set(a,e.getFloat32(h+0),e.getFloat32(h+4),e.getFloat32(h+8)),h+=12,i.set(b,e.getFloat32(h+0),e.getFloat32(h+4),e.getFloat32(h+8)),h+=12,p.addVertex(a,b,c,0);for(h=l+4,o=0;m>o;++o){var q=e.getUint32(h+0),r=e.getUint32(h+4),s=e.getUint32(h+8);h+=12,p.addTriangle(q-1,s-1,r-1)}return n}}();var O=function(){var a=l.create(),b=i.create();return function(c,d,e,f,g,h,j,l,m,n,o){var p=m.coilProfile;"C"===f||m.forceTube?l?k.ortho(e,g):i.cross(e,b,g):"H"===f?p=m.helixProfile:"E"===f?p=m.strandProfile:"A"===f&&(p=m.arrowProfile),k.buildRotation(a,g,e,b,!0),p.addTransformed(c,d,j,a,h,l,n,o)}}(),P=function(){var a=i.create(),b=i.create(),c=i.create();return function(d,e,f,g,h,j,k,l){var m=null,n=null,o=e.length();i.set(c,0,0,0);for(var p=0;o>p;++p){j.push(k.nextId({geom:d,atom:e.centralAtomAt(p)})),e.smoothPosAt(a,p,l.strength),g[3*p]=a[0],g[3*p+1]=a[1],g[3*p+2]=a[2],e.smoothNormalAt(b,p,l.strength);var q=e.centralAtomAt(p);l.color.colorFor(q,f,4*p),i.dot(b,c)<0&&i.scale(b,b,-1),"E"!==e.residueAt(p).ss()||l.forceTube||(null===m&&(m=p),n=p),"C"===e.residueAt(p).ss()&&null!==m&&(x(g,m,n,o),x(h,m,n,o),m=null,n=null),h[3*p]=g[3*p]+b[0]+c[0],h[3*p+1]=g[3*p+1]+b[1]+c[1],h[3*p+2]=g[3*p+2]+b[2]+c[2],i.copy(c,b)}}}(),Q=function(){var a=i.create(),b=i.create(),c=j.fromValues(0,0,0,1),d=i.create(),e=i.create();return function(f,l,m,n,o){var p=K([m],4*o.arcDetail,o.splineDetail),q=o.float32Allocator.request(3*m.length()),s=o.float32Allocator.request(4*m.length()),t=o.float32Allocator.request(3*m.length()),u=[],v=o.idPool.getContinuousRange(m.length());P(f,m,s,q,t,u,v,o),f.addIdRange(v);var w=f.vertArrayWithSpaceFor(p),x=k.catmullRomSpline(q,m.length(),o.splineDetail,o.strength,!1,o.float32Allocator),y=k.catmullRomSpline(t,m.length(),o.splineDetail,o.strength,!1,o.float32Allocator);l.setPerResidueColors(n,s);var z=o.radius*(m.residueAt(0).isAminoacid()?1:1.8),A=r(s,o.splineDetail);i.set(a,x[3]-x[0],x[4]-x[1],x[5]-x[2]),i.set(b,x[0],x[1],x[2]),i.set(d,y[0]-x[0],y[1]-x[0],y[2]-x[2]),i.normalize(a,a),i.normalize(d,d),j.set(c,A[0],A[1],A[2],A[3]);var B=w.numVerts();w.addVertex(b,[-a[0],-a[1],-a[2]],c,u[0]),O(w,b,d,m.residueAt(0).ss(),a,c,z,!0,o,0,u[0]),g(w,B,4*o.arcDetail);var C=w.numVerts(),D=0;l.addAssoc(n,w,D,B,C),D+=1;for(var E=Math.floor(o.splineDetail/2),F=k.catmullRomSplineNumPoints(m.length(),o.splineDetail,!1),G=1,H=F;H>G;++G){var I=3*G,J=4*G,L=3*(G+1),M=3*(G-1);i.set(b,x[I],x[I+1],x[I+2]),G===H-1?i.set(a,x[I]-x[M],x[I+1]-x[M+1],x[I+2]-x[M+2]):i.set(a,x[L]-x[M],x[L+1]-x[M+1],x[L+2]-x[M+2]),i.normalize(a,a),j.set(c,A[J],A[J+1],A[J+2],A[J+3]);var N=0,Q=Math.floor(G/o.splineDetail),R=Math.floor((G-1)/o.splineDetail),S=Math.floor((G+o.arrowSkip)/o.splineDetail),T=!1,U=m.residueAt(Q).ss();if(!o.forceTube){if(Q!==R){var V=m.residueAt(R).ss();if("C"===V&&("H"===U||"E"===U)){i.set(e,y[M]-x[M],y[M+1]-x[M+1],y[M+2]-x[M+2]),i.normalize(e,e);var W=2*Math.PI/(4*o.arcDetail),X=k.signedAngle(d,e,a);N=Math.round(X/W),N=(N+4*o.arcDetail)%(4*o.arcDetail)}}if(S!==Q&&S<m.length()){var Y=m.residueAt(S).ss();"C"===Y&&"E"===U&&(T=!0)}}i.set(d,y[3*G]-x[I],y[I+1]-x[I+1],y[I+2]-x[I+2]),i.normalize(d,d),B=w.numVerts();var Z=Math.floor((G+E)/o.splineDetail),$=u[Math.min(u.length-1,Z)];O(w,b,d,U,a,c,z,!1,o,N,$),T&&(l.addAssoc(n,w,D,B,C),O(w,b,d,"A",a,c,z,!1,o,0,$),G+=o.arrowSkip),C=w.numVerts(),G===H-1&&(C+=1),l.addAssoc(n,w,D,B,C),D+=1,T&&(D+=o.arrowSkip)}w.addVertex(b,a,c,u[u.length-1]),h(w,B,4*o.arcDetail),o.float32Allocator.release(t),o.float32Allocator.release(q)}}(),R=function(){var a=l.create(),b=i.create(),c=i.create(),d=i.create(),e=i.create(),f=i.create(),g=i.create(),h=j.fromValues(0,0,0,1),m=j.fromValues(0,0,0,1);return function(j,l,n,o,p){if(0!==n.length()){var q=p.idPool.getContinuousRange(n.length());j.addIdRange(q),p.color.colorFor(n.centralAtomAt(0),h,0);var r=H([n],p.protoSphere.numVerts(),p.protoCyl.numVerts()),s=r,t=j.vertArrayWithSpaceFor(r),u=t.maxVerts(),v=t.numVerts();n.posAt(f,0);var w=q.nextId({geom:j,atom:n.centralAtomAt(0)}),x=0;p.protoSphere.addTransformed(t,f,p.radius,h,w);var y=null;l.addAssoc(o,t,0,v,y);var z=p.float32Allocator.request(4*n.length());z[0]=h[0],z[1]=h[1],z[2]=h[2],z[3]=h[3];for(var A=p.protoCyl.numVerts()+p.protoSphere.numVerts(),B=1;B<n.length();++B){x=q.nextId({geom:j,atom:n.centralAtomAt(B)}),n.posAt(f,B-1),n.posAt(g,B),p.color.colorFor(n.centralAtomAt(B),m,0),z[4*B+0]=m[0],z[4*B+1]=m[1],z[4*B+2]=m[2],z[4*B+3]=m[3],i.sub(b,g,f);var C=i.length(b);i.scale(b,b,1/C),k.buildRotation(a,b,c,d,!1),i.copy(e,f),i.add(e,e,g),i.scale(e,e,.5),A>u-t.numVerts()&&(t=j.vertArrayWithSpaceFor(s)),s-=A;var D=t.numVerts();p.protoCyl.addTransformed(t,e,C,p.radius,a,h,m,w,x),y=t.numVerts(),y-=(y-D)/2,p.protoSphere.addTransformed(t,g,p.radius,m,x),w=x,l.addAssoc(o,t,B,v,y),v=y,i.copy(h,m)}l.setPerResidueColors(o,z),l.addAssoc(o,t,n.length()-1,v,t.numVerts())}}}();return s}(l,s,t,u),w=function(){function a(a,b,c,d,e,f){M.call(this,a);var g=f||{};this._options={},this._options.fillStyle=g.fillStyle||"#000",this._options.backgroundAlpha=g.backgroundAlpha||0,this._options.fontSize=g.fontSize||24,this._options.font=g.font||"Verdana",this._options.fontStyle=g.fontStyle||"normal",this._options.fontColor=g.fontColor||"#000",this._order=100,this._pos=d,this._interleavedBuffer=this._gl.createBuffer(),this._interleavedData=new Float32Array(30),this._prepareText(b,c,e);var h=.5,i=.5;this._interleavedData[0]=d[0],this._interleavedData[1]=d[1],this._interleavedData[2]=d[2],this._interleavedData[3]=-h,this._interleavedData[4]=-i,this._interleavedData[5]=d[0],this._interleavedData[6]=d[1],this._interleavedData[7]=d[2],this._interleavedData[8]=h,this._interleavedData[9]=i,this._interleavedData[10]=d[0],this._interleavedData[11]=d[1],this._interleavedData[12]=d[2],this._interleavedData[13]=h,this._interleavedData[14]=-i,this._interleavedData[15]=d[0],this._interleavedData[16]=d[1],this._interleavedData[17]=d[2],this._interleavedData[18]=-h,this._interleavedData[19]=-i,this._interleavedData[20]=d[0],this._interleavedData[21]=d[1],this._interleavedData[22]=d[2],this._interleavedData[23]=-h,this._interleavedData[24]=i,this._interleavedData[25]=d[0],this._interleavedData[26]=d[1],this._interleavedData[27]=d[2],this._interleavedData[28]=h,this._interleavedData[29]=i}function b(a){for(var b=1;a>b;)b*=2;return b}return e.derive(a,M,{updateProjectionIntervals:function(){},updateSquaredSphereRadius:function(a,b){return b},_setupTextParameters:function(a){a.fillStyle=this._options.fontColor,a.textAlign="left",a.textBaseline="bottom",a.font=this._options.fontStyle+" "+this._options.fontSize+"px "+this._options.font},_prepareText:function(a,c,d){this._setupTextParameters(c);var e=c.measureText(d).width,f=24;a.width=b(e),a.height=b(f),c.fillStyle=this._options.fillStyle,c.globalAlpha=this._options.backgroundAlpha,c.fillRect(0,0,a.width,a.height),this._setupTextParameters(c),c.globalAlpha=1,c.lineWidth=.5,c.lineStyle="none",c.fillText(d,0,a.height),c.strokeText(d,0,a.height),this._texture=this._gl.createTexture(),this._textureFromCanvas(this._texture,a),this._xScale=e/a.width,this._yScale=f/a.height,this._width=e,this._height=f},_textureFromCanvas:function(a,b){var c=this._gl;c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,!0),c.bindTexture(c.TEXTURE_2D,a),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,b),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.NEAREST),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.NEAREST),c.generateMipmap(c.TEXTURE_2D),c.bindTexture(c.TEXTURE_2D,null)},bind:function(){var a=this._gl;a.bindBuffer(a.ARRAY_BUFFER,this._interleavedBuffer),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,this._texture),this._ready||(a.bufferData(a.ARRAY_BUFFER,this._interleavedData,a.STATIC_DRAW),this._ready=!0)},draw:function(a,b,c,d){if(this._visible&&"normal"===d){var e=b.text;a.bind(e),this.bind();var f=this._gl,g=a.upsamplingFactor();f.uniform1f(f.getUniformLocation(e,"xScale"),this._xScale),f.uniform1f(f.getUniformLocation(e,"yScale"),this._yScale),f.uniform1f(f.getUniformLocation(e,"width"),2*g*this._width/a.viewportWidth()),f.uniform1f(f.getUniformLocation(e,"height"),2*g*this._height/a.viewportHeight()),f.uniform1i(f.getUniformLocation(e,"sampler"),0);var h=f.getAttribLocation(e,"attrCenter");f.enableVertexAttribArray(h),f.vertexAttribPointer(h,3,f.FLOAT,!1,20,0);var i=f.getAttribLocation(e,"attrCorner");f.vertexAttribPointer(i,2,f.FLOAT,!1,20,12),f.enableVertexAttribArray(i),f.enable(f.BLEND),f.blendFunc(f.SRC_ALPHA,f.ONE_MINUS_SRC_ALPHA),f.drawArrays(f.TRIANGLES,0,6),f.disableVertexAttribArray(h),f.disableVertexAttribArray(i),f.disable(f.BLEND)}}}),a}(),x=function(c){function d(){this._vertData=[],this._indexData=[],this._numVerts=0}function f(a,b,e,f){M.call(this,b),this._float32Allocator=e,this._uint16Allocator=f,this._data=new d,this._protoSphere=new c.ProtoSphere(8,8),this._protoCyl=new c.ProtoCylinder(8),this._va=null,this._ready=!1}function g(a,b,c){for(var d=0;c-1>d;++d)a.addTriangle(b,b+1+d,b+2+d);a.addTriangle(b,b+c,b+1)}function h(a,b,c){for(var d=b+c,e=0;c-1>e;++e)a.addTriangle(d,b+e+1,b+e);a.addTriangle(d,b,b+c-1)}var i=a.vec3,j=a.mat3,l=b.forceRGB;return d.prototype={numVerts:function(){return this._numVerts},addVertex:function(a,b,c,d){this._numVerts+=1,this._vertData.push(a[0],a[1],a[2],b[0],b[1],b[2],c[0],c[1],c[2],c[3],d)},addTriangle:function(a,b,c){this._indexData.push(a,b,c)},numIndices:function(){return this._indexData.length},indexData:function(){return this._indexData},vertData:function(){return this._vertData}},e.derive(f,M,{updateProjectionIntervals:function(){},updateSquaredSphereRadius:function(a,b){return b},addTube:function(){var a=i.create(),b=i.create(),c=i.create(),d=i.create(),e=j.create();return function(f,j,m,n){n=n||{};var o=l(n.color||"white"),p=!0;void 0!==n.cap&&(p=n.cap),i.sub(d,j,f);var q=i.length(d);if(i.normalize(d,d),i.add(a,f,j),i.scale(a,a,.5),k.buildRotation(e,d,b,c,!1),p){var r=this._data.numVerts();this._data.addVertex(f,[-d[0],-d[1],-d[2]],o,0),g(this._data,r,8)}if(this._protoCyl.addTransformed(this._data,a,q,m,e,o,o,0,0),p){var s=this._data.numVerts();this._data.addVertex(j,d,o,0),h(this._data,s-8,8)}this._ready=!1}}(),addSphere:function(a,b,c){c=c||{};var d=l(c.color||"white");this._protoSphere.addTransformed(this._data,a,b,d,0),this._ready=!1},_prepareVertexArray:function(){this._ready=!0,null!==this._va&&this._va.destroy(),this._va=new O(this._gl,this._data.numVerts(),this._data.numIndices(),this._float32Allocator,this._uint16Allocator),this._va.setIndexData(this._data.indexData()),this._va.setVertData(this._data.vertData())},draw:function(a,b,c,d){if(this._visible){this._ready||this._prepareVertexArray();var e=this.shaderForStyleAndPass(b,c,d);if(e){a.bind(e),this._gl.uniform1i(e.symId,255);var f=this._va;f.bind(e),f.draw(),f.releaseAttribs(e)}}},shaderForStyleAndPass:function(a,b,c){if("normal"===c)return a.hemilight;if("select"===c)return null;if("outline"===c)return a.outline;var d=a[c];return void 0!==d?d:null}}),f}(l),y=function(){function b(a,b,c){this._from=a,this._to=b,this._duration=c,this._left=c,this._start=Date.now(),this._looping=!1,this._finished=!1}function c(a,c,d){b.call(this,g.clone(a),g.clone(c),d),this._current=g.clone(a)}function d(a,c,d){var e=i.create(),f=i.create();i.fromMat4(e,a),i.fromMat4(f,c);var g=h.create(),j=h.create();h.fromMat3(g,e),h.fromMat3(j,f),this._current=i.create(),b.call(this,g,j,d)}function f(a,c,d){var e=i.create();i.fromMat4(e,a),b.call(this,e,null,d),this._axis=g.clone(c),this.setLooping(!0),this._current=i.create()}var g=a.vec3,h=a.quat,i=a.mat3;return b.prototype={setLooping:function(a){this._looping=a},step:function(){var a,b=Date.now(),c=b-this._start;if(0===this._duration)a=1;else if(this._looping){var d=Math.floor(c/this._duration);a=(c-d*this._duration)/this._duration}else c=Math.min(this._duration,c),a=c/this._duration,this._finished=1===a;return this._setTo(a)},_setTo:function(a){var b=(1-Math.cos(a*Math.PI))/2;return this._current=this._from*(1-b)+this._to*b,this._current},finished:function(){return this._finished}},e.derive(c,b,{_setTo:function(a){var b=(1-Math.cos(a*Math.PI))/2;return g.lerp(this._current,this._from,this._to,b),this._current}}),e.derive(d,b,{_setTo:function(){var a=h.create();return function(b){return h.slerp(a,this._from,this._to,b),i.fromQuat(this._current,a),this._current}}()}),e.derive(f,b,{_setTo:function(){var a=i.create();return function(b){var c=.2*Math.sin(2*b*Math.PI);return k.axisRotation(a,this._axis,c),i.mul(this._current,this._from,a),this._current}}()}),{Move:c,Rotate:d,RockAndRoll:f,Animation:b}}(),z=function(d,f,g,h,i,j,k,l,m,n){function o(){return/(iPad|iPhone|iPod)/g.test(navigator.userAgent)}function p(a){if("complete"!==document.readyState&&"loaded"!==document.readyState&&"interactive"!==document.readyState)return!1;if(void 0===a)try{var b=document.createElement("canvas");return!(!window.WebGLRenderingContext||!b.getContext("experimental-webgl"))}catch(c){return!1}return!!a}function q(a,b){return a=a||"auto","fixed"===a?new c.FixedSlab(b):"auto"===a?new c.AutoSlab(b):null}function r(a,b,c){this._obj=a,this._symIndex=b,this._transform=c}function s(a,b){this._options=this._initOptions(b,a),this._initialized=!1,this._objects=[],this._domElement=a,this._redrawRequested=!1,this._resize=!1,this._lastTimestamp=null,this._objectIdManager=new d,this.listenerMap={},this._camAnim={center:null,zoom:null,rotation:null},this._initCanvas(),this.quality(this._options.quality),null!==this._options.atomDoubleClicked&&this.addListener("atomDoubleClicked",this._options.atomDoubleClicked),null!==this._options.atomClick&&this.addListener("atomClicked",this._options.atomClick),"complete"===document.readyState||"loaded"===document.readyState||"interactive"===document.readyState?this._initPV():document.addEventListener("DOMContentLoaded",e.bind(this,this._initPV))}function t(a,b,c){return b in a?a[b]:c}var u='<div style="vertical-align:middle; text-align:center;"><h1>WebGL not supported</h1><p>Your browser does not support WebGL. You might want to try Chrome, Firefox, IE 11, or newer versions of Safari</p><p>If you are using a recent version of one of the above browsers, your graphic card might be blocked. Check the browser documentation for details on how to unblock it.</p></div>',v=a.vec3,w=a.mat4,x=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}();return r.prototype={object:function(){return this._obj},symIndex:function(){return this._symIndex},transform:function(){return this._transform}},s.prototype={_initOptions:function(a,c){a=a||{};var d={width:a.width||500,height:a.height||500,animateTime:a.animateTime||0,antialias:a.antialias,quality:t(a,"quality","low"),style:t(a,"style","hemilight"),background:b.forceRGB(a.background||"white"),slabMode:q(a.slabMode),atomClick:a.atomClicked||a.atomClick||null,outline:t(a,"outline",!0),atomDoubleClicked:t(a,"atomDoubleClicked",t(a,"atomDoubleClick","center")),fog:t(a,"fog",!0)},e=c.getBoundingClientRect();return"auto"===d.width&&(d.width=e.width),"auto"===d.height&&(d.height=e.height),d},_centerOnClicked:function(a){if(null!==a){var b=v.create(),c=a.object().atom,d=c.pos();a.transform()?(v.transformMat4(b,d,a.transform()),this.setCenter(b,this._options.animateTime)):this.setCenter(d,this._options.animateTime)}},_ensureSize:function(){if(this._resize){this._resize=!1;var a=this._options.width*this._options.samples,b=this._options.height*this._options.samples;this._options.realWidth=a,this._options.realHeight=b,this._gl.viewport(0,0,a,b),this._canvas.width=a,this._canvas.height=b,this._cam.setViewportSize(a,b),this._options.samples>1&&this._initManualAntialiasing(this._options.samples),this._pickBuffer.resize(this._options.width,this._options.height)}},resize:function(a,b){(a!==this._options.width||b!==this._options.height)&&(this._resize=!0,this._options.width=a,this._options.height=b,this.requestRedraw())},fitParent:function(){var a=this._domElement.getBoundingClientRect();this.resize(a.width,a.height)},gl:function(){return this._gl},ok:function(){return this._initialized},options:function(a,b){return void 0!==b?("fog"===a?(this._cam.fog(b),this._options.fog=b,this.requestRedraw()):this._options[a]=b,b):this._options[a]},quality:function(a){return this._options.quality=a,"high"===a?(this._options.arcDetail=4,this._options.sphereDetail=16,void(this._options.splineDetail=8)):"medium"===a?(this._options.arcDetail=3,this._options.sphereDetail=10,void(this._options.splineDetail=4)):"low"===a?(this._options.arcDetail=2,this._options.sphereDetail=8,void(this._options.splineDetail=2)):void 0},imageData:function(){return this._canvas.toDataURL()},_initContext:function(){try{var a={antialias:this._options.antialias,preserveDrawingBuffer:!0};this._gl=this._canvas.getContext("experimental-webgl",a)}catch(b){return!1}return this._gl?!0:!1},_initManualAntialiasing:function(a){var b=1/a,c=.5*-(1-b)*this._options.realWidth,d=.5*-(1-b)*this._options.realHeight,e="translate("+c+"px, "+d+"px)",f="scale("+b+", "+b+")",g=e+" "+f;this._canvas.style.webkitTransform=g,this._canvas.style.transform=g,this._canvas.style.ieTransform=g,this._canvas.width=this._options.realWidth,this._canvas.height=this._options.realHeight},_initPickBuffer:function(){var a={width:this._options.width,height:this._options.height};this._pickBuffer=new f(this._gl,a)},_initGL:function(){var a=1;if(!this._initContext())return!1;var b=this._gl;return!b.getContextAttributes().antialias&&this._options.antialias&&(a=2),this._options.realWidth=this._options.width*a,this._options.realHeight=this._options.height*a,this._options.samples=a,a>1&&this._initManualAntialiasing(a),b.viewportWidth=this._options.realWidth,b.viewportHeight=this._options.realHeight,b.clearColor(this._options.background[0],this._options.background[1],this._options.background[2],1),b.lineWidth(2),b.cullFace(b.FRONT),b.enable(b.CULL_FACE),b.enable(b.DEPTH_TEST),this._initPickBuffer(),!0
},_shaderFromString:function(a,b){var c,d=this._gl;if("fragment"===b)c=d.createShader(d.FRAGMENT_SHADER);else{if("vertex"!==b)return null;c=d.createShader(d.VERTEX_SHADER)}var e=o()?"highp":"mediump",f=a.replace("${PRECISION}",e);return d.shaderSource(c,f),d.compileShader(c),d.getShaderParameter(c,d.COMPILE_STATUS)?c:null},_initShader:function(a,b){var c=this._gl,d=this._shaderFromString(b,"fragment"),f=this._shaderFromString(a,"vertex"),g=c.createProgram();if(c.attachShader(g,f),c.attachShader(g,d),c.linkProgram(g),!c.getProgramParameter(g,c.LINK_STATUS))return null;c.clearColor(this._options.background[0],this._options.background[1],this._options.background[2],1),c.enable(c.BLEND),c.blendFunc(c.SRC_ALPHA,c.ONE_MINUS_SRC_ALPHA),c.enable(c.CULL_FACE),c.enable(c.DEPTH_TEST);var h=e.bind(c,c.getAttribLocation),i=e.bind(c,c.getUniformLocation);return g.posAttrib=h(g,"attrPos"),g.colorAttrib=h(g,"attrColor"),g.normalAttrib=h(g,"attrNormal"),g.objIdAttrib=h(g,"attrObjId"),g.symId=i(g,"symId"),g.projection=i(g,"projectionMat"),g.modelview=i(g,"modelviewMat"),g.rotation=i(g,"rotationMat"),g.fog=i(g,"fog"),g.fogFar=i(g,"fogFar"),g.fogNear=i(g,"fogNear"),g.fogColor=i(g,"fogColor"),g.outlineColor=i(g,"outlineColor"),g},_mouseUp:function(){var a=this._canvas;a.removeEventListener("mousemove",this._mouseRotateListener,!1),a.removeEventListener("mousemove",this._mousePanListener,!1),a.removeEventListener("mouseup",this._mouseUpListener,!1),document.removeEventListener("mouseup",this._mouseUpListener,!1),document.removeEventListener("mousemove",this._mouseRotateListener),document.removeEventListener("mousemove",this._mousePanListener)},_initPV:function(){if(!this._initGL())return this._domElement.removeChild(this._canvas),this._domElement.innerHTML=u,this._domElement.style.width=this._options.width+"px",this._domElement.style.height=this._options.height+"px",!1;this._2dcontext=this._textureCanvas.getContext("2d"),this._float32Allocator=new g(Float32Array),this._uint16Allocator=new g(Uint16Array),this._cam=new h(this._gl),this._cam.setUpsamplingFactor(this._options.samples),this._cam.fog(this._options.fog),this._cam.setFogColor(this._options.background),this._shaderCatalog={hemilight:this._initShader(i.HEMILIGHT_VS,i.HEMILIGHT_FS),outline:this._initShader(i.OUTLINE_VS,i.OUTLINE_FS),lines:this._initShader(i.HEMILIGHT_VS,i.LINES_FS),text:this._initShader(i.TEXT_VS,i.TEXT_FS),select:this._initShader(i.SELECT_VS,i.SELECT_FS)},this._boundDraw=e.bind(this,this._draw),this._mousePanListener=e.bind(this,this._mousePan),this._mouseRotateListener=e.bind(this,this._mouseRotate),this._mouseUpListener=e.bind(this,this._mouseUp);var a=e.bind(this._canvas,this._canvas.addEventListener);return"onwheel"in this._canvas?a("wheel",e.bind(this,this._mouseWheelFF),!1):a("mousewheel",e.bind(this,this._mouseWheel),!1),a("dblclick",e.bind(this,this._mouseDoubleClick),!1),a("mousedown",e.bind(this,this._mouseDown),!1),this._touchHandler=new j(this._canvas,this,this._cam),this._initialized||(this._initialized=!0,this._dispatchEvent({name:"viewerReadyEvent"},"viewerReady",this)),!0},requestRedraw:function(){this._redrawRequested||(this._redrawRequested=!0,x(this._boundDraw))},_drawWithPass:function(a){for(var b=0,c=this._objects.length;b!==c;++b)this._objects[b].draw(this._cam,this._shaderCatalog,this._options.style,a)},_initCanvas:function(){this._canvas=document.createElement("canvas"),this._textureCanvas=document.createElement("canvas"),this._textureCanvas.style.display="none",this._canvas.width=this._options.width,this._canvas.height=this._options.height,this._domElement.appendChild(this._canvas),this._domElement.appendChild(this._textureCanvas)},setRotation:function(a,b){if(b|=0,0===b)return this._cam.setRotation(a),void this.requestRedraw();var c;9===a.length?(c=w.create(),w.fromMat3(c,a)):c=w.clone(a),this._camAnim.rotation=new n.Rotate(this._cam.rotation(),c,b),this.requestRedraw()},setCamera:function(a,b,c,d){d|=0,this.setCenter(b,d),this.setRotation(a,d),this.setZoom(c,d)},_animateCam:function(){var a=!1;this._camAnim.center&&(this._cam.setCenter(this._camAnim.center.step()),this._camAnim.center.finished()&&(this._camAnim.center=null),a=!0),this._camAnim.rotation&&(this._cam.setRotation(this._camAnim.rotation.step()),this._camAnim.rotation.finished()&&(this._camAnim.rotation=null),a=!0),this._camAnim.zoom&&(this._cam.setZoom(this._camAnim.zoom.step()),this._camAnim.zoom.finished()&&(this._camAnim.zoom=null),a=!0),a&&this.requestRedraw()},_draw:function(){this._redrawRequested=!1,this._ensureSize(),this._animateCam();var a=this._options.slabMode.update(this._objects,this._cam);null!==a&&this._cam.setNearFar(a.near,a.far),this._gl.clear(this._gl.COLOR_BUFFER_BIT|this._gl.DEPTH_BUFFER_BIT),this._gl.viewport(0,0,this._options.realWidth,this._options.realHeight),this._gl.enable(this._gl.CULL_FACE),this._options.outline&&(this._gl.cullFace(this._gl.BACK),this._gl.enable(this._gl.CULL_FACE),this._drawWithPass("outline")),this._gl.cullFace(this._gl.FRONT),this._gl.enable(this._gl.BLEND),this._drawWithPass("normal")},setCenter:function(a,b){return b|=0,0===b?void this._cam.setCenter(a):(this._camAnim.center=new n.Move(this._cam.center(),v.clone(a),b),void this.requestRedraw())},setZoom:function(a,b){return b|=0,0===b?void this._cam.setZoom(a):(this._camAnim.zoom=new n.Animation(this._cam.zoom(),a,b),void this.requestRedraw())},centerOn:function(a,b){this.setCenter(a.center(),b)},clear:function(){for(var a=0;a<this._objects.length;++a)this._objects[a].destroy();this._objects=[]},_mouseWheel:function(a){this._cam.zoom(a.wheelDelta<0?-1:1),a.preventDefault(),this.requestRedraw()},_mouseWheelFF:function(a){this._cam.zoom(a.deltaY<0?1:-1),a.preventDefault(),this.requestRedraw()},_mouseDoubleClick:function(){return function(a){var b=this._canvas.getBoundingClientRect(),c=this.pick({x:a.clientX-b.left,y:a.clientY-b.top});this._dispatchEvent(a,"atomDoubleClicked",c),this.requestRedraw()}}(),addListener:function(a,b){var c=this.listenerMap[a];"undefined"==typeof c&&(c=[],this.listenerMap[a]=c),c.push("center"===b?e.bind(this,this._centerOnClicked):b),this._initialized&&"viewerReady"===a&&b(this,null)},_dispatchEvent:function(a,b,c){var d=this.listenerMap[b];d&&d.forEach(function(b){b(c,a)})},_mouseDown:function(a){if(0===a.button){var b=(new Date).getTime();if("undefined"==typeof this.lastClickTime||b-this.lastClickTime>300){this.lastClickTime=b;var c=this._canvas.getBoundingClientRect(),d=this.pick({x:a.clientX-c.left,y:a.clientY-c.top});this._dispatchEvent(a,"atomClicked",d)}a.preventDefault(),a.shiftKey===!0?(this._canvas.addEventListener("mousemove",this._mousePanListener,!1),document.addEventListener("mousemove",this._mousePanListener,!1)):(this._canvas.addEventListener("mousemove",this._mouseRotateListener,!1),document.addEventListener("mousemove",this._mouseRotateListener,!1)),this._canvas.addEventListener("mouseup",this._mouseUpListener,!1),document.addEventListener("mouseup",this._mouseUpListener,!1),this._lastMousePos={x:a.pageX,y:a.pageY}}},_mouseRotate:function(a){var b={x:a.pageX,y:a.pageY},c={x:b.x-this._lastMousePos.x,y:b.y-this._lastMousePos.y},d=.005;this._cam.rotateX(d*c.y),this._cam.rotateY(d*c.x),this._lastMousePos=b,this.requestRedraw()},_mousePan:function(a){var b={x:a.pageX,y:a.pageY},c={x:b.x-this._lastMousePos.x,y:b.y-this._lastMousePos.y},d=.001*this._cam.zoom();this._cam.panXY(d*c.x,d*c.y),this._lastMousePos=b,this.requestRedraw()},RENDER_MODES:["sline","lines","trace","lineTrace","cartoon","tube","spheres","ballsAndSticks"],renderAs:function(a,b,c,d){for(var e=!1,f=0;f<this.RENDER_MODES.length;++f)if(this.RENDER_MODES[f]===c){e=!0;break}return e?this[c](a,b,d):void 0},_handleStandardMolOptions:function(a,b){return a=this._handleStandardOptions(a),a.showRelated=a.showRelated||"asym",a.showRelated&&"asym"!==a.showRelated&&null===b.assembly(a.showRelated)&&(a.showRelated="asym"),a},_handleStandardOptions:function(a){return a=e.copy(a),a.float32Allocator=this._float32Allocator,a.uint16Allocator=this._uint16Allocator,a.idPool=this._objectIdManager,a},lineTrace:function(a,c,d){var e=this._handleStandardMolOptions(d,c);e.color=e.color||b.uniform([1,0,1]),e.lineWidth=e.lineWidth||4;var f=k.lineTrace(c,this._gl,e);return this.add(a,f)},spheres:function(a,c,d){var e=this._handleStandardMolOptions(d,c);e.color=e.color||b.byElement(),e.sphereDetail=this.options("sphereDetail"),e.radiusMultiplier=e.radiusMultiplier||1;var f=k.spheres(c,this._gl,e);return this.add(a,f)},sline:function(a,c,d){var e=this._handleStandardMolOptions(d,c);e.color=e.color||b.uniform([1,0,1]),e.splineDetail=e.splineDetail||this.options("splineDetail"),e.strength=e.strength||1,e.lineWidth=e.lineWidth||4;var f=k.sline(c,this._gl,e);return this.add(a,f)},cartoon:function(a,c,d){var e=this._handleStandardMolOptions(d,c);e.color=e.color||b.bySS(),e.strength=e.strength||1,e.splineDetail=e.splineDetail||this.options("splineDetail"),e.arcDetail=e.arcDetail||this.options("arcDetail"),e.radius=e.radius||.3,e.forceTube=e.forceTube||!1;var f=k.cartoon(c,this._gl,e),g=this.add(a,f);return g},surface:function(a,b,c){var d=this._handleStandardOptions(c),e=k.surface(b,this._gl,d);return this.add(a,e)},tube:function(a,b,c){return c=c||{},c.forceTube=!0,this.cartoon(a,b,c)},ballsAndSticks:function(a,c,d){var e=this._handleStandardMolOptions(d,c);e.color=e.color||b.byElement(),e.radius=e.radius||.3,e.arcDetail=2*(e.arcDetail||this.options("arcDetail")),e.sphereDetail=e.sphereDetail||this.options("sphereDetail");var f=k.ballsAndSticks(c,this._gl,e);return this.add(a,f)},lines:function(a,c,d){var e=this._handleStandardMolOptions(d,c);e.color=e.color||b.byElement(),e.lineWidth=e.lineWidth||4;var f=k.lines(c,this._gl,e);return this.add(a,f)},trace:function(a,c,d){var e=this._handleStandardMolOptions(d,c);e.color=e.color||b.uniform([1,0,0]),e.radius=e.radius||.3,e.arcDetail=2*(e.arcDetail||this.options("arcDetail")),e.sphereDetail=e.sphereDetail||this.options("sphereDetail");var f=k.trace(c,this._gl,e);return this.add(a,f)},fitTo:function(a){var b=this._cam.mainAxes(),c=[new e.Range,new e.Range,new e.Range];if(a instanceof M)a.updateProjectionIntervals(b[0],b[1],b[2],c[0],c[1],c[2]);else if(void 0!==a.eachAtom){a.eachAtom(function(a){for(var d=a.pos(),e=0;3>e;++e)c[e].update(v.dot(d,b[e]))});for(var d=0;3>d;++d)c[d].extend(1.5)}this._fitToIntervals(b,c)},_fitToIntervals:function(a,b){if(!(b[0].empty()||b[1].empty()||b[2].empty())){var c=b[0].center(),d=b[1].center(),e=b[2].center(),f=[c*a[0][0]+d*a[1][0]+e*a[2][0],c*a[0][1]+d*a[1][1]+e*a[2][1],c*a[0][2]+d*a[1][2]+e*a[2][2]],g=this._cam.fieldOfViewY(),h=this._cam.aspectRatio(),i=b[0].length()/h,j=b[1].length(),k=.5*Math.max(i,j),l=k/Math.tan(.5*g),m=l+.5*b[2].length(),n=.5,o=Math.max(l-n,.1),p=2*n+l+b[2].length();this._cam.setNearFar(o,p),this.setCamera(this._cam.rotation(),f,m,this._options.animateTime),this.requestRedraw()}},autoZoom:function(){var a=this._cam.mainAxes(),b=[new e.Range,new e.Range,new e.Range];this.forEach(function(c){c.visible()&&c.updateProjectionIntervals(a[0],a[1],a[2],b[0],b[1],b[2])}),this._fitToIntervals(a,b)},slabInterval:function(){},autoSlab:function(){var a=this._options._slabMode.update(this._objects,this._cam);null!==a&&this._cam.setNearFar(a.near,a.far),this.requestRedraw()},rockAndRoll:function(a){return a===!0?(this._camAnim.rotation=new n.RockAndRoll(this._cam.rotation(),[0,1,0],2e3),this.requestRedraw()):a===!1&&(this._camAnim.rotation=null,this.requestRedraw()),null!==this._camAnim.rotation},slabMode:function(a,b){b=b||{};var c=q(a,b),d=c.update(this._objects,this._cam);null!==d&&this._cam.setNearFar(d.near,d.far),this._options.slabMode=c,this.requestRedraw()},label:function(a,b,c,d){var e=new l(this._gl,this._textureCanvas,this._2dcontext,c,b,d);return this.add(a,e),e},customMesh:function(a,b){var c=this._handleStandardOptions(b),d=new m(a,this._gl,c.float32Allocator,c.uint16Allocator);return this.add(a,d),d},_drawPickingScene:function(){var a=this._gl;a.clearColor(0,0,0,0),a.disable(a.BLEND),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),a.clearColor(this._options.background[0],this._options.background[1],this._options.background[2],1),a.cullFace(a.FRONT),a.enable(a.CULL_FACE),this._drawWithPass("select")},pick:function(a){this._pickBuffer.bind(),this._drawPickingScene();var b=new Uint8Array(4),c=this._gl;if(c.readPixels(a.x,this._options.height-a.y,1,1,c.RGBA,c.UNSIGNED_BYTE,b),this._pickBuffer.release(),b.data&&(b=b.data),0===b[3])return null;var d=b[0]|b[1]<<8,e=b[2],f=this._objectIdManager.objectForId(d);if(void 0===f)return null;var g=null;return 255!==e&&(g=f.geom.symWithIndex(e)),new r(f,255>e?e:null,g)},add:function(a,b){return b.name(a),this._objects.push(b),this._objects.sort(function(a,b){return a.order()-b.order()}),this.requestRedraw(),b},_globToRegex:function(a){var b=a.replace(".","\\.").replace("*",".*");return new RegExp("^"+b+"$")},forEach:function(){var a,b="*";2===arguments.length?(a=arguments[1],b=arguments[0]):a=arguments[0];for(var c=this._globToRegex(b),d=0;d<this._objects.length;++d){var e=this._objects[d];c.test(e.name())&&a(e,d)}},get:function(a){for(var b=0;b<this._objects.length;++b)if(this._objects[b].name()===a)return this._objects[b];return null},hide:function(a){this.forEach(a,function(a){a.hide()})},show:function(a){this.forEach(a,function(a){a.show()})},rm:function(a){for(var b=[],c=this._globToRegex(a),d=0;d<this._objects.length;++d){var e=this._objects[d];c.test(e.name())?e.destroy():b.push(e)}this._objects=b},all:function(){return this._objects},isWebGLSupported:function(){return p(this._gl)},destroy:function(){this.clear(),this._canvas.width=1,this._canvas.height=1,this._canvas.parentElement.removeChild(this._canvas),this._canvas=null}},s.prototype.on=s.prototype.addListener,{Viewer:function(a,b){return new s(a,b)},isWebGLSupported:p}}(d,f,g,h,i,j,v,w,x,y),A=function(){function a(a,b){this._chains=a||[],this._matrices=b||[]}function b(a){this._name=a,this._generators=[]}return a.prototype={addChain:function(a){this._chains.push(a)},chains:function(){return this._chains},addMatrix:function(a){this._matrices.push(a)},matrices:function(){return this._matrices},matrix:function(a){return this._matrices[a]}},b.prototype={name:function(){return this._name},generators:function(){return this._generators},generator:function(a){return this._generators[a]},addGenerator:function(a){this._generators.push(a)}},{SymGenerator:a,Assembly:b}}(),B=function(){function a(){}function b(b,c,d,e,f,g){a.call(this),this._residue=b,this._bonds=[],this._isHetatm=!!g,this._name=c,this._pos=d,this._index=f,this._element=e}function c(b,c){a.call(this),this._resView=b,this._atom=c,this._bonds=[]}return a.prototype={name:function(){return this._name},pos:function(){return this._pos},element:function(){return this._element},index:function(){return this._index},prop:function(a){return this[a]()},bondCount:function(){return this.bonds().length},eachBond:function(a){for(var b=this.bonds(),c=0,d=b.length;d>c;++c)a(b[c])}},e.derive(b,a,{addBond:function(a){this._bonds.push(a)},name:function(){return this._name},bonds:function(){return this._bonds},residue:function(){return this._residue},structure:function(){return this._residue.structure()},full:function(){return this},qualifiedName:function(){return this.residue().qualifiedName()+"."+this.name()},isHetatm:function(){return this._isHetatm}}),e.derive(c,a,{full:function(){return this._atom},name:function(){return this._atom.name()},pos:function(){return this._atom.pos()},element:function(){return this._atom.element()},residue:function(){return this._resView},bonds:function(){return this._atom.bonds()},index:function(){return this._atom.index()},qualifiedName:function(){return this._atom.qualifiedName()},isHetatm:function(){return this._atom.isHetatm()}}),{Atom:b,AtomView:c}}(),C=function(b){function c(){}function d(a,b,d,e){c.call(this),this._name=b,this._num=d,this._insCode=e,this._atoms=[],this._ss="C",this._chain=a,this._isAminoacid=!1,this._isNucleotide=!1,this._index=a.residues().length}function f(a,b){c.call(this),this._chainView=a,this._atoms=[],this._residue=b}var g=a.vec3,h=b.Atom,i=b.AtomView;return c.prototype={prop:function(a){return this[a]()},isWater:function(){return"HOH"===this.name()||"DOD"===this.name()},eachAtom:function(a,b){b|=0;for(var c=0;c<this._atoms.length;c+=1){if(a(this._atoms[c],b)===!1)return!1;b+=1}return b},qualifiedName:function(){var a=this.chain().name()+"."+this.name()+this.num();return"\x00"===this.insCode()?a:a+this.insCode()},atom:function(a){if("string"==typeof a){for(var b=0;b<this._atoms.length;++b)if(this._atoms[b].name()===a)return this._atoms[b];return null}return a>=this._atoms.length&&0>a?null:this._atoms[a]},centralAtom:function(){return this.isAminoacid()?this.atom("CA"):this.isNucleotide()?this.atom("C3'"):null},center:function(){var a=0,b=g.create();return this.eachAtom(function(c){g.add(b,b,c.pos()),a+=1}),a>0&&g.scale(b,b,1/a),b},isAminoacid:function(){return this._isAminoacid},isNucleotide:function(){return this._isNucleotide}},e.derive(d,c,{_deduceType:function(){this._isNucleotide=null!==this.atom("P")&&null!==this.atom("C3'"),this._isAminoacid=null!==this.atom("N")&&null!==this.atom("CA")&&null!==this.atom("C")&&null!==this.atom("O")},name:function(){return this._name},insCode:function(){return this._insCode},num:function(){return this._num},full:function(){return this},addAtom:function(a,b,c,d){var e=new h(this,a,b,c,this.structure().nextAtomIndex(),d);return this._atoms.push(e),e},ss:function(){return this._ss},setSS:function(a){this._ss=a},index:function(){return this._index},atoms:function(){return this._atoms},chain:function(){return this._chain},structure:function(){return this._chain.structure()}}),e.derive(f,c,{addAtom:function(a){var b=new i(this,a.full());this._atoms.push(b)},full:function(){return this._residue},num:function(){return this._residue.num()},insCode:function(){return this._residue.insCode()},ss:function(){return this._residue.ss()},index:function(){return this._residue.index()},chain:function(){return this._chainView},name:function(){return this._residue.name()},atoms:function(){return this._atoms},qualifiedName:function(){return this._residue.qualifiedName()},containsResidue:function(a){return this._residue.full()===a.full()},isAminoacid:function(){return this._residue.isAminoacid()},isNucleotide:function(){return this._residue.isNucleotide()},isWater:function(){return this._residue.isWater()}}),{ResidueView:f,Residue:d}}(B),D=function(){function b(){this._trace=[]}function c(a,b,c,d){this._fullTrace=a,this._fullTraceBegin=b,this._fullTraceEnd=c,this._trace=d,this._isNTerminal=0===this._fullTraceBegin,this._isCTerminal=this._fullTrace.length()===this._fullTraceEnd;var e=this._fullTraceEnd-this._fullTraceBegin;this._isCTerminal||++e,this._isNTerminal||(++e,this._fullTraceBegin-=1),this._length=e}var d=a.vec3;return b.prototype={push:function(a){this._trace.push(a)},length:function(){return this._trace.length},residueAt:function(a){return this._trace[a]},posAt:function(a,b){return d.copy(a,this._trace[b].centralAtom().pos()),a},normalAt:function(a,b){var c=this._trace[b];return c.isAminoacid()&&d.sub(a,c.atom("O").pos(),c.atom("C").pos()),d.normalize(a,a),a},centralAtomAt:function(a){return this._trace[a].centralAtom()},tangentAt:function(){var a=d.create(),b=d.create();return function(c,e){e>0?this.posAt(a,e-1):this.posAt(a,e),e<this._trace.length-1?this.posAt(b,e+1):this.posAt(b,e),d.sub(c,b,a)}}(),fullTraceIndex:function(a){return a},subsets:function(a){for(var b=0,d=0,e=[];d<a.length&&b<this._trace.length;){for(var f=a[d].full().index();this._trace.length>b&&this._trace[b].index()<f;)++b;if(b>=this._trace.length)break;for(var g=this._trace[b].index();a.length>d&&a[d].full().index()<g;)++d;if(d>=a.length)break;for(var h=b,i=d;a.length>d&&this._trace.length>b&&a[d].full().index()===this._trace[b].index();)++d,++b;var j=d,k=b;e.push(new c(this,h,k,a.slice(i,j)))}return e}},b.prototype.smoothPosAt=b.prototype.posAt,b.prototype.smoothNormalAt=b.prototype.normalAt,c.prototype={length:function(){return this._length},residueAt:function(a){return this._fullTrace.residueAt(this._fullTraceBegin+a)},_interpolate:function(){var a=d.create(),b=d.create();return function(c,e,f,g){return this.tangentAt(a,e),this.tangentAt(b,f),d.scale(a,a,g),d.scale(b,b,g),k.cubicHermiteInterpolate(c,this.centralAtomAt(e).pos(),a,this.centralAtomAt(f).pos(),b,.5,0),c}}(),smoothPosAt:function(){return function(a,b,c){if(0===b&&!this._isNTerminal)return this._interpolate(a,b,b+1,c);if(b===this._length-1&&!this._isCTerminal)return this._interpolate(a,b-1,b,c);var e=this.centralAtomAt(b);return d.copy(a,e.pos()),a}}(),smoothNormalAt:function(){return function(a,b){return this._fullTrace.normalAt(a,b+this._fullTraceBegin),a}}(),posAt:function(a,b){var c=this.centralAtomAt(b),e=null;return d.copy(a,c.pos()),0!==b||this._isNTerminal||(e=this.centralAtomAt(b+1),d.add(a,a,e.pos()),d.scale(a,a,.5)),b!==this._length-1||this._isCTerminal||(e=this.centralAtomAt(b-1),d.add(a,a,e.pos()),d.scale(a,a,.5)),a},centralAtomAt:function(a){return this.residueAt(a).centralAtom()},fullTraceIndex:function(a){return this._fullTraceBegin+a},tangentAt:function(a,b){return this._fullTrace.tangentAt(a,b+this._fullTraceBegin)}},{TraceSubset:c,BackboneTrace:b}}(),E=function(b,c){function d(a,b){return a<<8|b.charCodeAt(0)}function f(a,b){return a.num()<b.num()}function g(a){return{num:function(){return a}}}function h(){}function i(a,b){h.call(this),this._structure=a,this._name=b,this._cachedTraces=[],this._residues=[],this._rnumsOrdered=!0}function j(a,b,c){var d,e;a?(d=b.atom("C"),e=c.atom("N")):(d=b.atom("O3'"),e=c.atom("P"));var f=n.sqrDist(d.pos(),e.pos());return Math.abs(f-2.25)>1}function k(a,b){b.length()<2||a.push(b)}function l(a,b,c){if(0===a.length)return!0;if(!b)return!1;var e=d(c.num(),c.insCode()),f=a[a.length-1],g=d(f.num(),f.insCode());return e>g}function m(a,b){h.call(this),this._chain=b,this._residues=[],this._molView=a,this._residueMap={},this._rnumsOrdered=!0}var n=a.vec3,o=b.Residue,p=b.ResidueView;return h.prototype={eachAtom:function(a,b){b|=0;for(var c=0;c<this._residues.length;c+=1)if(b=this._residues[c].eachAtom(a,b),b===!1)return!1;return b},atomCount:function(){for(var a=0,b=this.residues(),c=0;c<b.length;++c)a+=b[c].atoms().length;return a},eachResidue:function(a){for(var b=0;b<this._residues.length;b+=1)if(a(this._residues[b])===!1)return!1},residues:function(){return this._residues},structure:function(){return this._structure},asView:function(){var a=this.structure().createEmptyView();return a.addChain(this,!0),a},residueByRnum:function(a){var b=this.residues();if(this._rnumsOrdered){var c=e.binarySearch(b,g(a),f);return-1===c?null:b[c]}for(var d=0;d<b.length;++d)if(b[d].num()===a)return b[d];return null},residuesInRnumRange:function(a,b){var c,d,h=[],i=this.residues();if(this._rnumsOrdered===!0){var j=e.indexFirstLargerEqualThan(i,g(a),f);if(-1===j)return h;var k=e.indexLastSmallerEqualThan(i,g(b),f);if(-1===k)return h;for(c=j;k>=c;++c)h.push(this._residues[c])}else for(c=0,d=i.length;c!==d;++c){var l=i[c];l.num()>=a&&l.num()<=b&&h.push(l)}return h},prop:function(a){return this[a]()}},e.derive(i,h,{name:function(){return this._name},full:function(){return this},addResidue:function(a,b,c){c=c||"\x00";var d=new o(this,a,b,c);return this._rnumsOrdered=l(this._residues,this._rnumsOrdered,d),this._residues.push(d),d},assignSS:function(a,b,c){for(var e=d(a[0],a[1]),f=d(b[0],b[1]),g=1;g<this._residues.length-1;++g){var h=this._residues[g],i=d(h.num(),h.insCode());e>=i||i>=f||h.setSS(c)}},eachBackboneTrace:function(a){this._cacheBackboneTraces();for(var b=0;b<this._cachedTraces.length;++b)a(this._cachedTraces[b])},_cacheBackboneTraces:function(){if(!(this._cachedTraces.length>0)){for(var a=new c.BackboneTrace,b=null,d=0;d<this._residues.length;d+=1){var e=this._residues[d],f=e.isAminoacid(),g=e.isNucleotide();if(b===!0&&!f||b===!1&&!g||null===b&&!g&&!f)k(this._cachedTraces,a),b=null,a=new c.BackboneTrace;else if(0!==a.length()){var h=this._residues[d-1];j(b,h,e)&&(k(this._cachedTraces,a),a=new c.BackboneTrace),a.push(e)}else a.push(e),b=e.isAminoacid()}k(this._cachedTraces,a)}},backboneTraces:function(){var a=[];return this.eachBackboneTrace(function(b){a.push(b)}),a}}),e.derive(m,h,{addResidue:function(a,b){var c=new p(this,a.full());if(this._rnumsOrdered=l(this._residues,this._rnumsOrdered,a),this._residues.push(c),this._residueMap[a.full().index()]=c,b)for(var d=a.atoms(),e=0;e<d.length;++e)c.addAtom(d[e].full());return c},containsResidue:function(a){var b=this._residueMap[a.full().index()];return void 0===b?!1:b.full()===a.full()},eachBackboneTrace:function(a){for(var b=this._chain.backboneTraces(),c=0;c<b.length;++c)for(var d=b[c].subsets(this._residues),e=0;e<d.length;++e)a(d[e])},backboneTraces:function(){var a=[];return this.eachBackboneTrace(function(b){a.push(b)}),a},full:function(){return this._chain},name:function(){return this._chain.name()},structure:function(){return this._molView}}),{Chain:i,ChainView:m}}(C,D),F=function(){var b=a.vec3,c=function(a,c){var d={atom_one:a,atom_two:c};return{atom_one:function(){return d.atom_one},atom_two:function(){return d.atom_two},mid_point:function(a){return a||(a=b.create()),b.add(a,d.atom_one.pos(),d.atom_two.pos()),b.scale(a,a,.5),a}}};return{Bond:c}}(),G=function(){function a(a,b){for(var c=0;c<b.length;++c)if(!b[c](a))return!1;return!0}function b(a){var b=[];return void 0!==a.aname&&b.push(function(b){return b.name()===a.aname}),void 0!==a.hetatm&&b.push(function(b){return b.isHetatm()===a.hetatm}),void 0!==a.anames&&b.push(function(b){for(var c=b.name(),d=0;d<a.anames.length;++d)if(c===a.anames[d])return!0;return!1}),b}function c(a){var b=[];if(void 0!==a.rname&&b.push(function(b){return b.name()===a.rname}),void 0!==a.rnames&&b.push(function(b){for(var c=b.name(),d=0;d<a.rnames.length;++d)if(c===a.rnames[d])return!0;return!1}),void 0!==a.rnums){for(var c={},d=0;d<a.rnums.length;++d)c[a.rnums[d]]=!0;b.push(function(a){var b=a.num();return c[b]===!0})}return void 0!==a.rnum&&b.push(function(b){return b.num()===a.rnum}),b}function d(a){var b=[];return void 0!==a.cname&&(a.chain=a.cname),void 0!==a.cnames&&(a.chains=a.cnames),void 0!==a.chain&&b.push(function(b){return b.name()===a.chain}),void 0!==a.chains&&b.push(function(b){for(var c=b.name(),d=0;d<a.chains.length;++d)if(c===a.chains[d])return!0;return!1}),b}function e(a,b){var c=a.residues();b.rnumRange&&(c=a.residuesInRnumRange(b.rnumRange[0],b.rnumRange[1]));var d,e,f=[];if(void 0!==b.rindexRange){for(d=b.rindexRange[0],e=Math.min(c.length-1,b.rindexRange[1]);e>=d;++d)f.push(c[d]);return f}if(b.rindices&&void 0!==b.rindices.length){for(f=[],d=0;d<b.rindices.length;++d)f.push(c[b.rindices[d]]);return f}return c}function f(f,g,h){var i=c(h),j=b(h),k=d(h);h.rindex&&(h.rindices=[h.rindex]);for(var l=0;l<f._chains.length;++l){var m=f._chains[l];if(a(m,k))for(var n=e(m,h),o=null,p=0;p<n.length;++p)if(a(n[p],i)){o||(o=g.addChain(m,!1));for(var q=null,r=n[p].atoms(),s=0;s<r.length;++s)a(r[s],j)&&(q||(q=o.addResidue(n[p],!1)),q.addAtom(r[s]))}}return g}return{dict:f}}(),H=function(b,c,d){function f(a){var b=q[a.toUpperCase()];return void 0!==b?b:1.5}function g(a,b,c){var d=b.atom("C"),e=c.atom("N");if(d&&e){var f=m.sqrDist(d.pos(),e.pos());1.6*1.6>f&&a.connect(e,d)}}function h(a,b,c){var d=b.atom("O3'"),e=c.atom("P");if(d&&e){var f=m.sqrDist(d.pos(),e.pos());1.7*1.7>f&&a.connect(d,e)}}function i(){}function j(){i.call(this),this._chains=[],this._assemblies=[],this._nextAtomIndex=0}function l(a){i.call(this),this._mol=a,this._chains=[]}var m=a.vec3,n=b.Chain,o=b.ChainView,p=c.Bond,q={H:.31,HE:.28,LI:1.28,BE:.96,B:.84,C:.76,N:.71,O:.66,F:.57,NE:.58,NA:1.66,MG:1.41,AL:1.21,SI:1.11,P:1.07,S:1.05,CL:1.02,AR:1.06,K:2.03,CA:1.76,SC:1.7,TI:1.6,V:1.53,CR:1.39,MN:1.39,FE:1.32,CO:1.26,NI:1.24,CU:1.32,ZN:1.22,GA:1.22,GE:1.2,AS:1.19,SE:1.2,BR:1.2,KR:1.16,RB:2.2,SR:1.95,Y:1.9,ZR:1.75,NB:1.64,MO:1.54,TC:1.47,RU:1.46,RH:1.42,PD:1.39,AG:1.45,CD:1.44,IN:1.42,SN:1.39,SB:1.39,TE:1.38,I:1.39,XE:1.4,CS:2.44,BA:2.15,LA:2.07,CE:2.04,PR:2.03,ND:2.01,PM:1.99,SM:1.98,EU:1.98,GD:1.96,TB:1.94,DY:1.92,HO:1.92,ER:1.89,TM:1.9,YB:1.87,LU:1.87,HF:1.75,TA:1.7,W:1.62,RE:1.51,OS:1.44,IR:1.41,PT:1.36,AU:1.36,HG:1.32,TL:1.45,PB:1.46,BI:1.48,PO:1.4,AT:1.5,RN:1.5,FR:2.6,RA:2.21,AC:2.15,TH:2.06,PA:2,U:1.96,NP:1.9,PU:1.87,AM:1.8,CM:1.69};return i.prototype={eachResidue:function(a){for(var b=0;b<this._chains.length;b+=1)if(this._chains[b].eachResidue(a)===!1)return!1},eachAtom:function(a,b){b|=0;for(var c=0;c<this._chains.length;c+=1)if(b=this._chains[c].eachAtom(a,b),b===!1)return!1},residueCount:function(){for(var a=this.chains(),b=0,c=0;c<a.length;++c)b+=a[c].residues().length;return b},eachChain:function(a){for(var b=this.chains(),c=0;c<b.length;++c)if(a(b[c])===!1)return},atomCount:function(){for(var a=this.chains(),b=0,c=0;c<a.length;++c)b+=a[c].atomCount();return b},atoms:function(){var a=[];return this.eachAtom(function(b){a.push(b)}),a},atom:function(a){var b=a.split("."),c=this.chain(b[0]);if(null===c)return null;var d=c.residueByRnum(parseInt(b[1],10));return null===d?null:d.atom(b[2])},center:function(){var a=m.create(),b=0;return this.eachAtom(function(c){m.add(a,a,c.pos()),b+=1}),b&&m.scale(a,a,1/b),a},boundingSphere:function(){var a=this.center(),b=0;return this.eachAtom(function(c){b=Math.max(b,m.sqrDist(a,c.pos()))}),new k.Sphere(a,Math.sqrt(b))},backboneTraces:function(){for(var a=this.chains(),b=[],c=0;c<a.length;++c)Array.prototype.push.apply(b,a[c].backboneTraces());return b},select:function(a){return"protein"===a?this.residueSelect(function(a){return a.isAminoacid()}):"water"===a?this.residueSelect(function(a){return a.isWater()}):"ligand"===a?this.residueSelect(function(a){return!a.isAminoacid()&&!a.isWater()}):d.dict(this,new l(this),a||{})},residueSelect:function(a){for(var b=new l(this.full()),c=0;c<this._chains.length;++c)for(var d=this._chains[c],e=null,f=d.residues(),g=0;g<f.length;++g)a(f[g])&&(e||(e=b.addChain(d,!1)),e.addResidue(f[g],!0));return b},atomSelect:function(a){for(var b=new l(this.full()),c=0;c<this._chains.length;++c)for(var d=this._chains[c],e=null,f=d.residues(),g=0;g<f.length;++g)for(var h=null,i=f[g],j=i.atoms(),k=0;k<j.length;++k)a(j[k])&&(e||(e=b.addChain(d,!1)),h||(h=e.addResidue(i,!1)),h.addAtom(j[k]));return b},assembly:function(a){for(var b=this.assemblies(),c=0;c<b.length;++c)if(b[c].name()===a)return b[c];return null},chainsByName:function(a){for(var b={},c=this.chains(),d=0;d<c.length;++d)b[c[d].name()]=c[d];for(var e=[],f=0;f<a.length;++f){var g=b[a[f]];void 0!==g&&e.push(g)}return e},selectWithin:function(){var a=m.create();return function(b,c){c=c||{};var d=c.radius||4,e=d*d,f=!!c.matchResidues,g=[];b.eachAtom(function(a){g.push(a)});for(var h=new l(this.full()),i=null,j=null,k=this.chains(),n=!1,o=0;o<k.length;++o){var p=k[o].residues();j=null;for(var q=0;q<p.length;++q){i=null,n=!1;for(var r=p[q].atoms(),s=0;s<r.length&&!n;++s)for(var t=0;t<g.length;++t)if(m.sub(a,r[s].pos(),g[t].pos()),!(m.sqrLen(a)>e)){if(j||(j=h.addChain(k[o].full(),!1)),i||(i=j.addResidue(p[q].full(),f)),f){n=!0;break}i.addAtom(r[s].full());break}}}return h}}(),createEmptyView:function(){return new l(this.full())}},e.derive(j,i,{addAssembly:function(a){this._assemblies.push(a)},setAssemblies:function(a){this._assemblies=a},assemblies:function(){return this._assemblies},chains:function(){return this._chains},full:function(){return this},containsResidue:function(a){return a.full().structure()===this},chainByName:function(a){for(var b=0;b<this._chains.length;++b)if(this._chains[b].name()===a)return this._chains[b];return null},chain:function(a){return this.chainByName(a)},nextAtomIndex:function(){var a=this._nextAtomIndex;return this._nextAtomIndex+=1,a},addChain:function(a){var b=new n(this,a);return this._chains.push(b),b},connect:function(a,b){var c=new p(a,b);return a.addBond(c),b.addBond(c),c},deriveConnectivity:function(){var a=this,b=null;
this.eachResidue(function(c){for(var d,e=c.atoms(),i=e.length,j=0;i>j;j+=1)for(var k=e[j],l=k.pos(),n=f(k.element()),o=0;j>o;o+=1){var p=e[o],q=f(p.element());d=m.sqrDist(l,p.pos());var r=n+q-.3,s=n+q+.3;s*s>d&&d>r*r&&a.connect(k,p)}c._deduceType(),null!==b&&(c.isAminoacid()&&b.isAminoacid()&&g(a,b,c),c.isNucleotide()&&b.isNucleotide()&&h(a,b,c)),b=c})}}),e.derive(l,i,{full:function(){return this._mol},assemblies:function(){return this._mol.assemblies()},addChain:function(a,b){var c=new o(this,a.full());if(this._chains.push(c),b)for(var d=a.residues(),e=0;e<d.length;++e)c.addResidue(d[e],!0);return c},containsResidue:function(a){if(!a)return!1;var b=this.chain(a.chain().name());return b?b.containsResidue(a):!1},chains:function(){return this._chains},chain:function(a){for(var b=0;b<this._chains.length;++b)if(this._chains[b].name()===a)return this._chains[b];return null}}),{MolView:l,Mol:j}}(E,F,G),I=Q=function(b){function c(a){for(var b=0;b<a.length();++b)a.residueAt(b).setSS(g(a,b)?"H":h(a,b)?"E":"C")}function d(a){for(var b=a.chains(),d=0;d<b.length;++d){var e=b[d];e.eachBackboneTrace(c)}}var e=a.vec3,f=function(){var a=e.create(),b=e.create();return function(c,d,f,g){for(var h=Math.max(0,d-2);d>=h;++h)for(var i=2;5>i;++i)if(!(h+i>=c.length())){var j=e.dist(c.posAt(a,h),c.posAt(b,h+i));if(Math.abs(j-f[i-2])>g)return!1}return!0}}(),g=function(a,b){var c=[5.45,5.18,6.37],d=2.1;return f(a,b,c,d)},h=function(a,b){var c=[6.1,10.4,13],d=1.42;return f(a,b,c,d)};return{Mol:b.Mol,assignHelixSheet:d}}(H),J=function(b){function c(){this._assemblies={},this._current=null}function d(a){if(" "!==a[0]){var b=a.trim();if(4===b.length)for(var c=0,d=b.charCodeAt(c);4>c&&(65>d||d>122||d>90&&97>d);)++c,d=b.charCodeAt(c);return b.substr(0,2)}return a[1]}function e(a){this._helices=[],this._sheets=[],this._conect=[],this._serialToAtomMap={},this._structure=new Q.Mol,this._remark350Reader=new c,this._currChain=null,this._currRes=null,this._currAtom=null,this._options={},this._options.conectRecords=!!a.conectRecords}function f(a){return a.split(/\r\n|\r|\n/g)}function g(a,b){for(var c=b||{},d=f(a),g=new e(c),h=0;h<d.length&&g.processLine(d[h]);h++);var i=g.finish();return i}function h(){this._structure=new Q.Mol,this._reset(),this._sawEnd=!1}function i(a){for(var b=new h,c=f(a),d=0;d<c.length&&b.processLine(c[d]);d++);var e=b.finish();return e}function j(a,b){var c=new XMLHttpRequest;c.open("GET",a,!0),c.onload=function(){c.response&&b(c.response)},c.send(null)}function k(a,b,c){j(a,function(a){var d=g(a,c);b(d)})}function l(a,b){j(a,function(a){var c=i(a);b(c)})}var m=a.vec3,n=a.mat4;return c.prototype={assemblies:function(){var a=[];for(var b in this._assemblies)this._assemblies.hasOwnProperty(b)&&a.push(this._assemblies[b]);return a},assembly:function(a){return this._assemblies[a]},nextLine:function(a){if(a=a.substr(11),"B"===a[0]&&"BIOMOLECULE:"===a.substr(0,12)){var c=a.substr(13).trim();return this._currentAssembly=new b.Assembly(c),void(this._assemblies[c]=this._currentAssembly)}if("APPLY THE FOLLOWING TO CHAINS:"!==a.substr(0,30)&&"                   AND CHAINS:"!==a.substr(0,30)){if("  BIOMT"===a.substr(0,7)){for(var d=parseInt(a[7],10)-1,e=0;" "!==a[12+e];)e+=1;var f=parseFloat(a.substr(13+e,9)),g=parseFloat(a.substr(23+e,9)),h=parseFloat(a.substr(33+e,9)),i=parseFloat(a.substr(43+e,14));return this._currentMatrix[0+d]=f,this._currentMatrix[4+d]=g,this._currentMatrix[8+d]=h,this._currentMatrix[12+d]=i,void(2===d&&(this._currentSymGen.addMatrix(this._currentMatrix),this._currentMatrix=n.create()))}}else{var j=a.substr(30).split(",");"A"===a[0]&&(this._currentSymGen=new b.SymGenerator,this._currentAssembly.addGenerator(this._currentSymGen)),this._currentMatrix=n.create();for(var k=0;k<j.length;++k){var l=j[k].trim();l.length&&this._currentSymGen.addChain(l)}}}},e.prototype={parseHelixRecord:function(a){var b=parseInt(a.substr(21,4),10),c=" "===a[25]?"\x00":a[25],d=parseInt(a.substr(33,4),10),e=" "===a[37]?"\x00":a[37],f=a[19];return this._helices.push({first:[b,c],last:[d,e],chainName:f}),!0},parseSheetRecord:function(a){var b=parseInt(a.substr(22,4),10),c=" "===a[26]?"\x00":a[26],d=parseInt(a.substr(33,4),10),e=" "===a[37]?"\x00":a[37],f=a[21];return this._sheets.push({first:[b,c],last:[d,e],chainName:f}),!0},parseAndAddAtom:function(a){var b=a[16];if(" "!==b&&"A"!==b)return!0;var c="H"===a[0],e=a[21],f=a.substr(17,3).trim(),g=a.substr(12,4),h=g.trim(),i=parseInt(a.substr(22,4),10);i!==i&&(i=1);var j=" "===a[26]?"\x00":a[26],k=!1,l=!1;this._currChain&&this._currChain.name()===e||(l=!0,k=!0),this._currRes&&this._currRes.num()===i&&this._currRes.insCode()===j||(k=!0),l&&(this._currChain=this._structure.chain(e)||this._structure.addChain(e)),k&&(this._currRes=this._currChain.addResidue(f,i,j));for(var n=m.create(),o=0;3>o;++o)n[o]=parseFloat(a.substr(30+8*o,8));var p=a.substr(76,2).trim();""===p&&(p=d(g));var q=this._currRes.addAtom(h,n,p,c);if(this._options.conectRecords){var r=parseInt(a.substr(6,5).trim(),10);this._serialToAtomMap[r]=q}return!0},parseConectRecord:function(a){for(var b=parseInt(a.substr(6,5).trim(),10),c=[],d=0;4>d;++d){var e=parseInt(a.substr(11+5*d,6).trim(),10);isNaN(e)||e>b||c.push(e)}return this._conect.push({from:b,to:c}),!0},processLine:function(a){var b=a.substr(0,6);if("ATOM  "===b||"HETATM"===b)return this.parseAndAddAtom(a);if("REMARK"===b){var c=a.substr(7,3);return"350"===c&&this._remark350Reader.nextLine(a),!0}return"HELIX "===b?this.parseHelixRecord(a):"SHEET "===b?this.parseSheetRecord(a):this._options.conectRecords&&"CONECT"===b?this.parseConectRecord(a):"END   "===b||"ENDMDL"===b?!1:!0},finish:function(){var a,b=null;for(a=0;a<this._sheets.length;++a){var c=this._sheets[a];b=this._structure.chain(c.chainName),b&&b.assignSS(c.first,c.last,"E")}for(a=0;a<this._helices.length;++a){var d=this._helices[a];b=this._structure.chain(d.chainName),b&&b.assignSS(d.first,d.last,"H")}return this._structure.setAssemblies(this._remark350Reader.assemblies()),this._options.conectRecords&&this._assignBondsFromConectRecords(this._structure),this._structure.deriveConnectivity(),this._structure},_assignBondsFromConectRecords:function(a){for(var b=0;b<this._conect.length;++b)for(var c=this._conect[b],d=this._serialToAtomMap[c.from],e=0;e<c.to.length;++e){var f=this._serialToAtomMap[c.to[e]];a.connect(d,f)}}},h.prototype={processLine:function(a){var b=this._state;if(3>b){if(0===b){var c=a.trim();if(0===c.length)return!1;this._title=c}return this._sawEnd=!1,this._state++,!0}if(3===b){if(this._expectedAtomCount=parseInt(a.substr(0,3).trim(),10),this._expectedBondCount=parseInt(a.substr(3,3).trim(),10),isNaN(this._expectedAtomCount)||isNaN(this._expectedBondCount))return!1;this._state++;var d=""+(this._structure.chains().length+1);this._currentChain=this._structure.addChain(d),this._currentResidue=this._currentChain.addResidue(this._title,1)}if(4===b){for(var e=[0,0,0],f=0;3>f;++f)if(e[f]=parseFloat(a.substr(10*f,10).trim()),isNaN(e[f]))return!1;var g=a.substr(31,3).trim();this._currentResidue.addAtom(g,e,g,!1),this._atomCount++,this._atomCount===this._expectedAtomCount&&this._state++}if(5===b){var h=parseInt(a.substr(0,3).trim(),10)-1,i=parseInt(a.substr(3,3).trim(),10)-1;if(isNaN(h)||isNaN(i))return!1;var j=this._currentResidue.atoms();this._structure.connect(j[h],j[i]),this._bondCount++,this._bondCount===this._expectedBondCount&&this._state++}return"M  END"===a.substr(0,6)&&(this._sawEnd=!0,this._state++),"$$$$"===a.substr(0,4)&&this._reset(),!0},_reset:function(){this._state=0,this._currentResidue=null,this._currentChain=null,this._expectedAtomCount=null,this._expectedBondount=null,this._atomCount=0,this._bondCount=0,this._title=""},finish:function(){return this._sawEnd?this._structure:null}},{pdb:g,sdf:i,Remark350Reader:c,fetchPdb:k,fetchSdf:l}}(A),K=function(){var b=a.vec3,c=a.mat3,d=function(){var a=b.create(),c=b.create();return function(d,e){b.set(a,0,0,0);var f=0;d.eachCentralAtom(function(c,d){b.add(a,a,d),f+=1}),0!==f&&(b.scale(a,a,1/f),e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0,d.eachCentralAtom(function(d,f){b.sub(c,f,a);var g=c[0],h=c[1],i=c[2];e[0]+=h*h+i*i,e[1]-=g*h,e[2]-=g*i,e[5]-=h*i,e[4]+=g*g+i*i,e[8]+=g*g+h*h}),e[3]=e[1],e[6]=e[2],e[7]=e[5])}}(),e=function(){var a=c.create(),e=c.create(),f=b.create(),g=b.create(),h=b.create(),i=b.create(),j=b.create(),l=b.create(),m=b.create();return function(n){d(n,a);var o=k.diagonalizer(a);c.fromQuat(e,o);var p=!0;n.eachCentralAtom(function(a,c){b.transformMat3(h,c,e),p?(b.copy(f,h),b.copy(g,h),p=!1):(b.min(f,f,h),b.max(g,g,h))}),b.sub(i,g,f);var q=[[i[0],0],[i[1],1],[i[2],2]];q.sort(function(a,b){return b[0]-a[0]});var r=q[0][1],s=q[1][1];b.set(j,e[r+0],e[r+3],e[r+6]),b.set(l,e[s+0],e[s+3],e[s+6]),b.cross(m,j,l);var t=c.create();return t[0]=j[0],t[1]=l[0],t[2]=m[0],t[3]=j[1],t[4]=l[1],t[5]=m[1],t[6]=j[2],t[7]=l[2],t[8]=m[2],t}}();return{principalAxes:e}}(),L=function(){return{Viewer:z.Viewer,isWebGLSupported:z.isWebGLSupported,io:J,color:b,mol:Q,rgb:{setColorPalette:b.setColorPalette,hex2rgb:b.hex2rgb},vec3:a.vec3,vec4:a.vec4,mat3:a.mat3,mat4:a.mat4,quat:a.quat,viewpoint:K}}()});
