document.getElementById('categoryLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('categorySection').style.display = 'block';
    document.getElementById('productSection').style.display = 'none';
    document.getElementById('categoryLink').classList.add('active');
    document.getElementById('productLink').classList.remove('active');
  });

  document.getElementById('productLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('categorySection').style.display = 'none';
    document.getElementById('productSection').style.display = 'block';
    document.getElementById('productLink').classList.add('active');
    document.getElementById('categoryLink').classList.remove('active');
  });