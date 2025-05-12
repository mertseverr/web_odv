document.addEventListener('DOMContentLoaded', function () {
    // Kitap Ekleme İşlevi (kitap-ekle.html)
    const kitapFormu = document.getElementById('kitapFormu');
    if (kitapFormu) {
        kitapFormu.addEventListener('submit', function (e) {
            e.preventDefault();
            const baslik = document.getElementById('baslik').value;
            const yazar = document.getElementById('yazar').value;
            const yil = document.getElementById('yil').value;

            const kitap = { baslik, yazar, yil };
            let kitaplar = JSON.parse(localStorage.getItem('kitaplar')) || [];
            kitaplar.push(kitap);
            localStorage.setItem('kitaplar', JSON.stringify(kitaplar));

            alert('Kitap başarıyla eklendi!');
            kitapFormu.reset();
        });
    }

    // Kitap Listeleme İşlevi (kitap-listesi.html)
    const kitapListesi = document.querySelector('#kitap-listesi');
    if (kitapListesi) {
        const kitaplar = JSON.parse(localStorage.getItem('kitaplar')) || [];
        kitaplar.forEach(kitap => {
            const kitapDiv = document.createElement('div');
            kitapDiv.classList.add('kart');
            kitapDiv.innerHTML = `
                <h3>${kitap.baslik}</h3>
                <p>Yazar: ${kitap.yazar}</p>
                <p>Yayın Yılı: ${kitap.yil}</p>
            `;
            kitapListesi.appendChild(kitapDiv);
        });
    }

    // Kitap Arama İşlevi (kitaplar.html)
    const kitapAra = document.querySelector('#kitap-ara');
    if (kitapAra) {
        const kitaplar = JSON.parse(localStorage.getItem('kitaplar')) || [];
        const sonucDiv = document.createElement('div');
        sonucDiv.classList.add('kart');
        kitapAra.parentElement.appendChild(sonucDiv);

        kitapAra.addEventListener('input', function () {
            const aranan = kitapAra.value.toLowerCase();
            sonucDiv.innerHTML = '';
            const eslesenKitaplar = kitaplar.filter(kitap =>
                kitap.baslik.toLowerCase().includes(aranan) || kitap.yazar.toLowerCase().includes(aranan)
            );
            eslesenKitaplar.forEach(kitap => {
                sonucDiv.innerHTML += `
                    <h3>${kitap.baslik}</h3>
                    <p>Yazar: ${kitap.yazar}</p>
                    <p>Yayın Yılı: ${kitap.yil}</p>
                `;
            });
        });
    }
});