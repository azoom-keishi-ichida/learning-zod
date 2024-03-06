import { nullable, string, z } from 'zod'
// const mySchema = z.string()
// const tuna = mySchema.parse('tuna') // => "tuna"
// const errorTuna = mySchema.parse(12) // => throws ZodError
// const safeParseTuna = mySchema.safeParse('tuna') // => { success: true; data: "tuna" }
// const errorSafeTuna = mySchema.safeParse(12) // => { success: false; error: ZodError }

// オブジェクトのTypeの設定
// const UserType = z.object({
//   username: z.string(),
// })

// const user = UserType.parse({ username: 'Ludwig' })

// type user = z.infer<typeof UserType>

// MEMO: stringのバリデーションメソッド
// z.string() // 単純な文字列
// z.string().min(5) // 5文字以上の文字列
// z.string().max(5) // 5文字以下の文字列
// z.string().length(5) // 固定幅の文字列
// z.string().email() // メールアドレス文字列
// z.string().url() // URL文字列
// z.string().uuid() // UUID文字列
// z.string().regex(regex) // 正規表現にマッチする文字列
// z.string().nonempty() // 空文字列以外の文字列
// z.string().includes('tuna', { message: 'Must include tuna' }) 文字列tunaを含まれているか
// z.string().startsWith('https://', { message: 'Must provide secure URL' }) 文字のスタートをチェック
// z.string().endsWith('.com', { message: 'Only .com domains allowed' })　文字の末尾をチェック
// z.string().ip({ message: 'Invalid IP address' }) ipアドレスであるかチェック
// z.string().trim(); // trim whitespace
// z.string().toLowerCase(); // toLowerCase
// z.string().toUpperCase(); // toUpperCase

// const stringMethod = z.object({
//   test: z
//     .string()
//     .min(6, { message: 'エラ〜が発生しました。もう一度見直してください' })
//     .toUpperCase(),
// })

// try {
//   const stringMethodText = stringMethod.parse({ test: 'd' })
//   console.dir(stringMethodText)
// } catch (err) {
//   console.error(err)
// }

// const dateTime = z.string().datetime()

// const UTC = dateTime.parse('2020-01-01T14:14:00Z') // pass
// try {
//   const JST = dateTime.parse('2020-01-01T00:00:00+02:00') // will throw an error
// } catch (error) {
//   console.error(error)
// }
// console.dir(UTC)

// const ipTypeV4 = z.string().ip({ version: 'v4' })
// const ipPath = ipTypeV4.parse('192.168.1.1') // pass
// console.dir(ipPath)
// try {
//   ipTypeV4.parse('192.168.1.1') // fail
// } catch (error) {
//   console.error(error)
// }

// MEMO: numberのバリデーションメソッド
// z.number() // 単純な数値( NaNとBigInt型は含まない )
// z.number().int() // 数値ではならない
// z.number().min(5) // 5以上の数値( >= 5 )
// z.number().max(5) // 5以下の数値( <= 5 )
// z.number().int() // 整数型の数値
// z.number().positive() // 0よりも大きい数値( > 0 )
// z.number().nonnegative() // 0以上の数値( >= 0 )
// z.number().negative() // 0より小さい数値( < 0 )
// z.number().nonpositive() // 0以下の数値( <= 0 )

// z.number().multipleOf(5) // 割り切れる数であるか

// z.number().finite() // 特定の数字でなければならない
// z.number().safe() // 間の数でなければならない
// const numberType = z.number().min(5)
// const number = numberType.parse(7) // pass
// console.dir(number)

//  こちらのnum宣言は許容されない
// const fish = ['Salmon', 'Tuna', 'Trout']
// const FishEnum = z.enum(fish)
// 特定の文字列を許容する
// const FishEnum = z.enum(['Salmon', 'Tuna', 'Trout'])
// const fish = FishEnum.parse('Tuna')
// type FishEnum = z.infer<typeof FishEnum>
// console.dir(fish)

// optionalを許容できるようになる(undefined)
// const stringSchema = z.string().optional()

// nullを許容できるようになる
// const stringSchema = z.string().nullable()

// 基本的な使い方は、オブジェクトで作成して、zodを作って抽出する
// const Dog = z.object({
//   name: z.string(),
//   age: z.number(),
// })
// // こちらのDogを使ってバリデーションを行う。
// type Dog = z.infer<typeof Dog>

// mergeを使って二つのバリデーションを合わせることができる
// const BaseTeacher = z.object({ students: z.array(z.string()) })
// const HasID = z.object({ id: z.string() })

// const Teacher = BaseTeacher.merge(HasID)
// type Teacher = z.infer<typeof Teacher> // => { students: string[], id: string }

// 初期のバリデーション
// const Recipe = z.object({
//   id: z.string(),
//   name: z.string(),
//   ingredients: z.array(z.string()),
// })
// // 特定のバリデーションを保持
// const JustTheName = Recipe.pick({ name: true })
// type JustTheName = z.infer<typeof JustTheName>// => { name: string }
// 特定のバリデーションを削除
// const NoIDRecipe = Recipe.omit({ id: true })
// type NoIDRecipe = z.infer<typeof NoIDRecipe>// => { name: string, ingredients: string[] }

// undefinedを追加する(引数がなければ全てundefinedを追加する)
// const optionalEmail = user.partial({
//   email: true,
// })
// {
//   email?: string | undefined;
//   username: string
// }

// partialとは反対で、すべてのプロパティが必須
// const requiredUser = user.required()

// 配列のバリデーション
// const stringArray = z.array(z.string())
// or
// const stringArray = z.string().array()

// 配列の中のデータが必ずあることを確かめるバリデーション
// const nonEmptyStrings = z.string().array().nonempty()

// 配列の中のitem数のバリデーション
// z.string().array().min(5)
// z.string().array().max(5)
// z.string().array().length(5)

// 複数のtype指定をする場合は、こちらを使う
// const stringOrNumber = z.string().or(z.number())
// const optionalUrl = z.union([z.string().url().nullish(), z.literal('')])

// 複数条件をメソッドで合わせることができる
// const Person = z.object({
//   name: z.string(),
// })
// const Employee = z.object({
//   role: z.string(),
// })
// const EmployedPerson = z.intersection(Person, Employee)
// // equivalent to:
// const EmployedPerson = Person.and(Employee)

// 非同期のpromise型でバリデーションを行いたい時
// const numberPromise = z.promise(z.string())
// numberPromise.parse(Promise.resolve('tuna'))
// const test = async () => {
//   await numberPromise.parse(Promise.resolve('tuna'))
//   await numberPromise.parse(Promise.resolve(3.14))
// }

// インスタンスに関するバリデーション
// class Test {
//   name: string
// }
// const TestSchema = z.instanceof(Test)

// const blob: any = 'whatever'
// TestSchema.parse(new Test())
// TestSchema.parse(blob)

// 関数に対してバリデーションをかける
// const myFunction = z
//   .function()
//   .args(z.string(), z.number()) // accepts an arbitrary number of arguments
//   .returns(z.boolean())
// type myFunction = z.infer<typeof myFunction>

// データの解析後に処理を行う
// const stringToNumber = z.string().transform((val) => val.length);
// stringToNumber.parse("string"); // => 6

// default値を設定することができる
// const stringWithDefault = z.string().default('tuna')
// stringWithDefault.parse(undefined) // => "tuna"

// バリデーションに引っかかった場合に、返す値を設定する
// const numberWithCatch = z.number().catch(42)
// numberWithCatch.parse(5) // => 5
// numberWithCatch.parse('tuna') // => 42

// objectを合わせることができる
// const sssss = z.intersection(z.object({ name: z.string() }), z.object({ age: z.number() }))
// const aaa = sssss.parse({
//   name: 'some string',
//   age: 1,
// })

//後からデータを書き換え得ることができない
// const schema = z.object({ name: string }).readonly()
// type schema = z.infer<typeof schema>

// const result = schema.parse({ name: 'fido' })
// result.name = 'simba' // error

// スキーマを新しく作り直すことができるpipeメソッド
// z.string()
//   .transform((val) => val.length)
//   .pipe(z.number().min(5))

// エラーを出す
const result = z
  .object({
    name: z.string(),
  })
  .safeParse({ name: 12 })

if (!result.success) {
  console.dir(result.error.issues[0].message)
}

// 出力
// console.dir(aaa)
