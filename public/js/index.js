function generateTrackingCode(packageId, weight) {
    return (packageId << 4 | weight).toString(2);
}

function validateRecipientName(name) {
    if (/^[a-zA-Z\s]+$/.test(name)) {
        return true;
    } else {
        alert("Error: Invalid Recipient Name. Please use alphabetic characters only.");
        return false;
    }
}

function validatePackageID(packageID) {
    if (/^\d+$/.test(packageID)) {
        return true;
    } else {
        alert("Error: Invalid Package ID. Please use numeric values only.");
        return false;
    }
}

function validateAddress(address) {
    if (address.trim() !== "" && !/\d/.test(address)) {
        return true;
    } else {
        alert("Error: Invalid  Delivery Address. It must not be empty or contain numbers.");
        return false;
    }
}

function validateWeight(weight) {
    if (weight > 0 && !isNaN(weight)) {
        return true;
    } else {
        alert("Error: Invalid Weight. It must be a positive number.");
        return false;
    }
}

const packageList = [];
const tableBody = document.getElementById("package-table").querySelector("tbody");
const form = document.getElementById("package-form");

function updateTable() {
    packageList.sort((a, b) => a.weight - b.weight);

    tableBody.innerHTML = "";
    packageList.forEach((pkg) => {
        const row = document.createElement("tr");

        const recipientCell = document.createElement("td");
        recipientCell.textContent = pkg.name;

        const packageIdCell = document.createElement("td");
        packageIdCell.textContent = pkg.packageId;

        const addressCell = document.createElement("td");
        addressCell.textContent = pkg.address;

        const weightCell = document.createElement("td");
        weightCell.textContent = pkg.weight;

        const trackingCodeCell = document.createElement("td");
        trackingCodeCell.textContent = pkg.trackingCode;

        row.appendChild(recipientCell);
        row.appendChild(packageIdCell);
        row.appendChild(addressCell);
        row.appendChild(weightCell);
        row.appendChild(trackingCodeCell);

        tableBody.appendChild(row);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const packageId = document.getElementById("packageID").value;
    const address = document.getElementById("address").value;
    const weight = parseFloat(document.getElementById("weight").value);

    if (
        validateRecipientName(name) &&
        validatePackageID(packageId) &&
        validateAddress(address) &&
        validateWeight(weight)
    ) {
        const trackingCode = generateTrackingCode(Number(packageId), weight);

        const packageData = {
            name,
            packageId,
            address,
            weight,
            trackingCode,
        };
        packageList.push(packageData);

        updateTable();

        form.reset();

        alert("Package added successfully!");
    }
});



