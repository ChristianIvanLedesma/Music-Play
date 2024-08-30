import './nuevaplaylist/form.css';
import { useState, ChangeEvent, FormEvent } from 'react';


interface Playlist {
  image: string;
  title: string;
  price: string;
}


interface FormPlayListProps {
  onCreate: (playlist: Playlist) => void; 
}

function FormPlayList({ onCreate }: FormPlayListProps) {
  const [product, setProduct] = useState<Playlist>({
    image: '',
    title: '',
    price: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product.image || !product.title || !product.price) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return; 
    }
    console.log('Producto guardado:', product);
    onCreate(product);
  };

  return (
    <div className="formu-playlist-container">
      <div className="formu-playlist">
        <h2>Creá tu Playlist</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder='Titulo'
          />
          <label htmlFor="price">Descripción</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder='Descripción'
          />
          <label htmlFor="image">Url Imagen</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder='Url Imagen'
          />
          <button type="submit">Agregar Playlist</button>
        </form>
      </div>
      
      <div className="product-display">
        <img src={product.image} />
       <div><p>{product.title}</p><p>{product.price}</p></div> 
        
      </div>
    </div>
  );
}

export default FormPlayList;
