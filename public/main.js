const expenseList = document.getElementById('expenseList');
const expenseForm = document.getElementById('expenseForm');

document.addEventListener('DOMContentLoaded', function () {

    renderExpenses();

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const expenseAmount = document.getElementById('expenseAmount').value;
        const expenseName = document.getElementById('expenseName').value;
        const expenseCategory = document.getElementById('expenseCategory').value;

        const expenseData = {
            amount: expenseAmount,
            name: expenseName,
            category: expenseCategory
        };

        console.log(expenseData);
        axios.post('http://localhost:3000/add-expense', expenseData)
        .then( (res) => {
            renderExpenses();
        })
        .catch(err => {
            console.log(err);
        })
    });
});

function fetchExpense() {
    return axios.get('http://localhost:3000/get-expense')
    .then( res => {
        console.log(res.data);
        return res.data.expense;
    })
    .catch(err => {
        console.log(err);
    })
}

function renderExpenses() {
    expenseList.innerHTML = '';
    fetchExpense()
    .then(expenseData => {  
        expenseData.forEach(expenseData => {
        const listItem = document.createElement('li');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        listItem.className = 'list-group-item tab-space';
        deleteBtn.className = 'btn btn-danger btn-sm float-right ml-2';
        editBtn.className = 'btn btn-warning btn-sm float-right ml-2';

        listItem.textContent = `$${expenseData.amount} ${expenseData.name} ${expenseData.category}`;
        deleteBtn.textContent = 'Delete';
        editBtn.textContent = 'Edit';

        expenseList.appendChild(listItem);
        listItem.appendChild(deleteBtn);
        listItem.appendChild(editBtn);

        deleteBtn.addEventListener('click', () => {
            deleteExpense(expenseData.id, listItem);
        });
        editBtn.addEventListener('click', editEl);
        
        function editEl() {
            document.getElementById('expenseAmount').value = values.amount; // Fix the value assignment
            document.getElementById('expenseName').value = values.name;
            document.getElementById('expenseCategory').value = values.category;
            deleteEl();
        }

        // Clear input
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseCategory').value = '';
        })
    })
}

function deleteExpense(expenseDataId, listItem) {
    axios.delete(`http://localhost:3000/delete-expense/${expenseDataId}`)
    .then(res => {
        console.log(expenseDataId);
        removeExpenseFromScreen(expenseDataId, listItem);
    })
}

function removeExpenseFromScreen(expenseDataId, listItem) {
    const parentNode = document.querySelector('expenseList');
    const childNodeToDelete = listItem;

    if (childNodeToDelete !== null) {
        parentNode.removeChild(childNodeToDelete);
        window.location.reload();
    }
}