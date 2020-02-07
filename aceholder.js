const ACEHOLDER_DEFAULT_OPTIONS = {
    classes: {
        isInit: 'aceholder-is-init',
        label: 'aceholder-label',
        paragraph: 'aceholder-paragraph',
        paragraphContainer: 'aceholder-paragraphs'
    },
    lengths: {
        wordMax: 10,
        wordMin: 2
    }
};

class AceholderElement extends HTMLElement { }

window.customElements.define('ace-holder', AceholderElement);

class Aceholder {
    constructor(container, options) {
        if (typeof container === 'undefined') {
            container = 'body';
        }// end if

        if (typeof options !== 'object') {
            options = {};
        }// end if

        this.container = (typeof container === 'object')
            ? container
            : document.querySelector(container);

        this.options = Object.assign({}, ACEHOLDER_DEFAULT_OPTIONS, options);

        if (this.container === null) {
            throw 'An invalid container was specified.';
        }// end if

        this.populateElements();
    }// end constructor()

    /**
	 * Generates a random integer between from and to.
	 *
	 * @param {number} from The lowest number to generate
	 * @param {number} to The highest number to generate
	 * @return {number} The generated number
	 */
    generateNumber(from, to) {
        from = parseInt(from);
        to = parseInt(to);

        return (Math.floor(
            from + (
                (to - from + 1) * Math.random()
            )
        ));
    }// end generateNumber()

    /**
	 * Generates a paragraph with {length} number of words.
	 *
	 * @param {number} length Number of words to generate
	 * @return {string} The generated paragraph
	 */
    generateParagraph(length) {
        let paragraph = [];

        for (let i = 0; i < length; i += 1) {
            paragraph.push(this.generateWord());
        }// end for

        return paragraph.join(' ');
    }// end generateParagraph()

    /**
	 * Generates a random word.
	 *
	 * The size of the word is a random number of letters between the
	 * wordMin and wordMax options.
	 *
	 * @return {string} The generated word
	 */
    generateWord() {
        let max = this.options.lengths.wordMax,
            min = this.options.lengths.wordMin,
            length = this.generateNumber(min, max) - 1,
            word = [];

        word.push(this.generateNumber(65, 90));
        for (let i = 0; i < length; i += 1) {
            word.push(this.generateNumber(97, 122));
        }// end for

        return String.fromCharCode.apply(null, word);
    }// end generateWord()

    /**
	 * Selects all uninitialized ace-holder elements and generates the
	 * appropriate child elements.
	 */
    populateElements() {
        let aceholders = Array.from(this.container.querySelectorAll(
            'ace-holder:not(.' + this.options.classes.isInit + ')'
        ));

        aceholders.forEach((aceholder) => {
            let labelContents = aceholder.innerHTML,
                label = document.createElement('div'),
                paragraphs = document.createElement('div'),
                numParagraphs = (aceholder.hasAttribute('paragraphs'))
                    ? parseInt(aceholder.getAttribute('paragraphs'))
                    : 3,
                wordsPer = (aceholder.hasAttribute('words-per'))
                    ? parseInt(aceholder.getAttribute('words-per'))
                    : 100;

            aceholder.innerHTML = '';

            paragraphs.classList.add(this.options.classes.paragraphContainer);
            aceholder.append(paragraphs);

            for (let i = 0; i < numParagraphs; i += 1) {
                let paragraph = document.createElement('div');

                paragraph.classList.add(this.options.classes.paragraph);
                paragraph.innerHTML = this.generateParagraph(wordsPer);

                paragraphs.append(paragraph);
            }// end for

            label.classList.add(this.options.classes.label);
            label.innerHTML = labelContents;

            paragraphs.append(label);

            aceholder.classList.add(this.options.classes.isInit);
        });
    }// end populateElements()

    /**
	 * Selects any initialized ace-holder elements and returns them to
	 * their original state.
	 */
    revertElements() {
        let aceholders = Array.from(this.container.querySelectorAll(
            'ace-holder.' + this.options.classes.isInit
        ));

        aceholders.forEach((aceholder) => {
            let label = aceholder.querySelector('.' + this.options.classes.label),
                labelContents = label.innerHTML;

            aceholder.innerHTML = labelContents;
            aceholder.classList.remove(this.options.classes.isInit);
        });
    }// end revertElements()
}// end class Aceholder
