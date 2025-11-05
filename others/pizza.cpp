#include <iostream>
#include <iomanip>
#include <string>
#include <vector>

using namespace std;

// ------------------- Pizza Class -------------------
class Pizza {
private:
    string name;
    string size;
    double price;

public:
    Pizza(string n = "Unknown", string s = "Medium", double p = 0.0)
        : name(n), size(s), price(p) {}

    string getName() const { return name; }
    string getSize() const { return size; }
    double getPrice() const { return price; }

    void display() const {
        cout << left << setw(15) << name
             << setw(10) << size
             << "$" << fixed << setprecision(2) << price << endl;
    }
};

// ------------------- Helper Functions -------------------
void showMenu() {
    cout << "==================== PIZZA MENU ====================\n";
    cout << left << setw(15) << "Pizza" << setw(10) << "Size" << "Price" << endl;
    cout << "----------------------------------------------------\n";
    cout << left << setw(15) << "Margherita" << setw(10) << "Small" << "$6.99\n";
    cout << left << setw(15) << "Margherita" << setw(10) << "Large" << "$9.99\n";
    cout << left << setw(15) << "Pepperoni"  << setw(10) << "Small" << "$7.99\n";
    cout << left << setw(15) << "Pepperoni"  << setw(10) << "Large" << "$11.99\n";
    cout << left << setw(15) << "Veggie"     << setw(10) << "Small" << "$7.49\n";
    cout << left << setw(15) << "Veggie"     << setw(10) << "Large" << "$10.99\n";
    cout << left << setw(15) << "BBQ Chicken"<< setw(10) << "Large" << "$12.49\n";
    cout << "====================================================\n";
}

double getPrice(string name, string size) {
    if (name == "Margherita" && size == "Small") return 6.99;
    if (name == "Margherita" && size == "Large") return 9.99;
    if (name == "Pepperoni"  && size == "Small") return 7.99;
    if (name == "Pepperoni"  && size == "Large") return 11.99;
    if (name == "Veggie"     && size == "Small") return 7.49;
    if (name == "Veggie"     && size == "Large") return 10.99;
    if (name == "BBQ Chicken"&& size == "Large") return 12.49;
    return 0.0;
}

// ------------------- Main Program -------------------
int main() {
    vector<Pizza> cart;
    string pizzaName, pizzaSize;
    char choice;
    double total = 0.0;

    cout << "🍕 Welcome to ChatGPT's Pizza Palace! 🍕\n\n";

    do {
        showMenu();

        cout << "Enter the pizza name you'd like (e.g., Margherita): ";
        cin.ignore();
        getline(cin, pizzaName);

        cout << "Enter size (Small/Large): ";
        getline(cin, pizzaSize);

        double price = getPrice(pizzaName, pizzaSize);

        if (price == 0.0) {
            cout << "Sorry, we don’t have that combination!\n";
        } else {
            Pizza p(pizzaName, pizzaSize, price);
            cart.push_back(p);
            total += price;
            cout << pizzaName << " (" << pizzaSize << ") added to your order!\n";
        }

        cout << "Would you like to order another pizza? (Y/N): ";
        cin >> choice;

    } while (toupper(choice) == 'Y');

    // ------------------- Display Order Summary -------------------
    cout << "\n============= YOUR ORDER =============\n";
    cout << left << setw(15) << "Pizza" << setw(10) << "Size" << "Price\n";
    cout << "--------------------------------------\n";

    for (auto &p : cart) {
        p.display();
    }

    cout << "--------------------------------------\n";
    cout << "Subtotal: $" << fixed << setprecision(2) << total << endl;

    // Add tax and tip
    double tax = total * 0.08;
    double tip = total * 0.10;
    double grandTotal = total + tax + tip;

    cout << "Tax (8%): $" << tax << endl;
    cout << "Tip (10%): $" << tip << endl;
    cout << "Total Due: $" << grandTotal << endl;
    cout << "======================================\n";

    // ------------------- Fun Ending -------------------
    cout << "\nThank you for choosing ChatGPT's Pizza Palace!\n";
    cout << "We hope you enjoy your delicious pizza! 😋\n";
    cout << "Come back soon for more cheesy goodness!\n";

    // Optional extra interaction
    cout << "\nWould you like a random pizza fact? (Y/N): ";
    cin >> choice;

    if (toupper(choice) == 'Y') {
        cout << "\n🍕 Fun Fact: The world's largest pizza was over 13,000 square feet!\n";
        cout << "It was made in Rome, Italy, and was 100% gluten-free!\n";
    } else {
        cout << "\nNo worries — go enjoy your pizza while it's hot! 🔥\n";
    }

    cout << "\nGoodbye and have a tasty day!\n";
    return 0;
}
