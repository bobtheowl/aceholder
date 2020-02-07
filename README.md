# Aceholder Elements

Placeholder elements for in-progress websites.

## Usage

```html
<div id="container">
    <ace-holder paragraphs="3" words-per="55">
        A label that will appear in the middle of the placeholder
    </ace-holder>
</div>

<script>
    (function () {
        const aceholder = new Aceholder('#container');
    }());
</script>
```

## How it works

The DOM is scanned for `<ace-holder>` elements and generates random text based on the option attributes.

CSS then blurs the random text and adds some additional styles.

The label (the innerHTML of the element) is then placed on top.

All `<ace-holder>` elements in the given selector are processed. This allows different options to be set for different aceholders.

If you are going to use the same settings for all aceholders, you can omit the selector and it will assume `'body'` as the selector.

## Options

An optional object of options can be set as a second argument.

```javascript
const aceholder = new Aceholder('body', {});
```

### Override generated classes

The classes added to the generated child elements and the `<ace-holder>` element can be overridden with these options:

```javascript
{
    classes: {
        // Added to <ace-holder> after it is initialized
        isInit: 'aceholder-is-init',
        // Added to the child <div> to mark it as the label
        label: 'aceholder-label',
        // Added to each paragraph <div>
        paragraph: 'aceholder-paragraph',
        // Added to the inner container <div> which holds the other elements
        paragraphContainer: 'aceholder-paragraphs'
    }
}
```

### Adjust lengths of generated words

The minimum and maximum length of generated words can be adjusted with these options:

```javascript
{
    lengths: {
        wordMax: 10,
        wordMin: 2
    }
}
```

## Todo

I would like to add the following features in the future:

 - Add support for image aceholders. More than likely this will be an optional `type="image"` attribute which will default to the standard text.
 - Update elements to automatically regenerate when word/paragraph attributes are changed.
 - Add some example images of the generated output to this readme.
