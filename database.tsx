import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("little_lemon");

export async function createTable() {
  return await db.execAsync(
    "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);"
  );
}

export async function getMenuItems() {
  return await db.runAsync("select * from menuitems");
}

export async function saveMenuItems(menuItems: any[]) {
  const values = menuItems.map((item) => {
    return `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`;
  });

  return await db.runAsync(
    `insert into menuitems (id, name, price, description, image, category) values ${values}`
  );
}

export async function filterByQueryAndCategories(
  query: string,
  activeCategories: string[]
) {
  const categories = activeCategories.join("','");

  const result = await db.getAllAsync(
    `select * from menuitems where name like ? and category in ('${categories}')`,
    [`%${query}%`]
  );
  return result;
}
