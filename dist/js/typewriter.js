class TypeWriter {
  constructor(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = wait;
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type () {
    const currIndex = this.wordIndex % this.words.length;
    const fullTxt = this.words[currIndex];

    if(!this.isDeleting){
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    } else this.txt = fullTxt.substring(0, this.txt.length - 1);

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;
    if(this.isDeleting) typeSpeed /= 2;

    if(!this.isDeleting && this.txt === fullTxt){
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === ''){
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 600;
    }

    setTimeout(_=> this.type(), typeSpeed)
  }
}

const init = () => {
  const textElement = document.querySelector('.txt-type');
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');
  new TypeWriter(textElement, words, wait)
};

document.addEventListener('DOMContentLoaded', init);
