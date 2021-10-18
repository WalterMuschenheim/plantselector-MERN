import React, { useState } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';


function Toasts(props) {
    React.useEffect(() => {
        var filterItems = document.querySelectorAll('.toast-p');
        for (let i = 0; i < filterItems.length; i++) {
            filterItems[i].addEventListener("click", (ev) => props.updateCriteria(null, ev.target.dataset.critval));
        }
    }, []);

    const toggle = () => props.clearCriteria(props.crittype)

    const ToastItems = props.criteria.map((criterium) =>  {
        return(
            <p className="toast-p"><a className="toast-link text-decoration-none" data-critval={criterium[1]}>{criterium[1]}</a></p>
            )
    })
    //const [show, setShow] = useState(true);

    return(
        <Toast /*isOpen={show}*/>
            <ToastHeader icon={<svg className="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="bisque"></rect></svg>} toggle={toggle}>
                {props.crittype}
            </ToastHeader>
            <ToastBody>
                {ToastItems}
            </ToastBody>
        </Toast>
    )
}


export default Toasts;