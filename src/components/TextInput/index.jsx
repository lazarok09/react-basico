import './styles.css';

export const TextInput = ({searchValue, handleInput}) => {
    return (
        <>
        <input 
        type="search" 
        onChange={
            handleInput
          } 
        value={searchValue}
        placeholder='Type your search'
        />
        </>
    )
    
}