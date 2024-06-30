/**
 * Generate Pagination Number
 */

/**
 * Generador de paginas
 * @param currentPage pagina actial
 * @param totalPages total de paginas
 * @returns {Array} con el total de todas las pages
 */
export const generatePaginationNumbers = (currentPage: number , totalPages: number) => {
    // let paginationArray: Array<string | number> = []; 

    //! Primer caso
    // * Mostrar las primeras posiciones 
    if ( totalPages <= 7 ) {
        return Array.from({ length: totalPages },  (_, i) => i + 1 ); //-> returna [1,2,3,4,5,6,7]
    }

    //! Segundo caso
    //* Si el currentPage esta entre las primeras paginas
    //* Mostrar las priemras 3 , luego '...' y al final las ultimas 3 paginas
    if ( currentPage <= 3 ) {
        return  [1,2,3,'...', totalPages - 1, totalPages ];
    }


    //! Tercer caso
    //* Si el currentPage esta entre las ultimas 2 paginas
    //* Mostrar las primaras 2, luego '...' y al final las ultimas 3
    if ( currentPage >= totalPages - 2 ) {
        return  [1,2,'...', totalPages - 1, totalPages ];
    }

    //! Cuarto caso
    //* Mostrar la primera pagina, luego '...' y al final vecinos
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages 
    ];

    //console.log("🚀 ~ generatePaginationNumber ~ paginationArray:", paginationArray)

}