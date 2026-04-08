interface VaultState {
    found: string[];
    revealed: boolean;
}

const Library = (() => {
    const KEYS: string[] = ['1370', '1920', '0042'];
    const PALETTE: string[] = ['#1a5e73', '#c4661f', '#8c2a21', '#245a69', '#5a7d44'];
    
    let state: VaultState = { 
        found: [], 
        revealed: false 
    };

    const createBookElement = (num: string, isSecret: boolean): HTMLDivElement => {
        const book = document.createElement('div');
        book.className = 'book';
        book.style.setProperty('--book-color', PALETTE[Math.floor(Math.random() * PALETTE.length)]);
        book.style.height = `${180 + Math.random() * 40}px`;

        const top = document.createElement('div');
        top.className = 'book-body';
        
        const text = document.createElement('span');
        text.className = 'book-spine-text';
        text.innerText = num;

        book.append(top, text);

        book.onclick = () => handleBookClick(book, num, isSecret);
        return book;
    };

    const handleBookClick = (el: HTMLElement, num: string, isSecret: boolean) => {
        if (state.revealed) return;
        
        const isTilted = el.classList.toggle('tilted');

        if (isTilted && isSecret && num === KEYS[state.found.length]) {
            el.classList.add('selected');
            state.found.push(num);
            updateUI();

            if (state.found.length === KEYS.length) {
                state.revealed = true;
                openVault();
            }
        }
    };

    const updateUI = () => {
        const status = document.getElementById('progress-text');
        if (status) status.innerText = `SECRETS FOUND: ${state.found.length} / ${KEYS.length}`;
    };

    const openVault = () => {
        const container = document.getElementById('bookshelfContainer');
        if (container) {
            setTimeout(() => container.classList.add('secret-open'), 500);
        }
    };

    const stackBooks = () => {
        document.querySelectorAll('.book').forEach(b => b.classList.remove('tilted'));
    };

    const refreshVault = () => {
        const shelfUnit = document.getElementById('shelf-unit') as HTMLDivElement | null;
        const container = document.getElementById('bookshelfContainer');
        if (!shelfUnit || !container) return;

        // Reset state
        shelfUnit.innerHTML = '';
        container.classList.remove('secret-open');
        state = { found: [], revealed: false };
        updateUI();

        for (let s = 0; s < 3; s++) {
            const shelf = document.createElement('div');
            shelf.className = 'shelf';
            for (let b = 0; b < 10; b++) {
                let val = Math.floor(1000 + Math.random() * 8999).toString();
                
                if (s === 0 && b === 0) val = KEYS[0];
                if (s === 1 && b === 2) val = KEYS[1];
                if (s === 2 && b === 4) val = KEYS[2];
                
                shelf.appendChild(createBookElement(val, KEYS.includes(val)));
            }
            shelfUnit.appendChild(shelf);
        }
    };

    return { refreshVault, stackBooks };
})();

document.addEventListener('DOMContentLoaded', () => {
    Library.refreshVault();
    
    document.getElementById('stack-books')?.addEventListener('click', Library.stackBooks);
    document.getElementById('reset-books')?.addEventListener('click', Library.refreshVault);
});