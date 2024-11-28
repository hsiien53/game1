<?php
// 產生一個隨機數字，範圍從 1 到 100
$randomNumber = rand(1, 100);

// 判斷是否有猜的數字
if (isset($_POST['guess'])) {
    $guess = (int)$_POST['guess'];

    // 比對使用者的猜測
    if ($guess < $randomNumber) {
        $message = "太小了，請再試一次！";
    } elseif ($guess > $randomNumber) {
        $message = "太大了，請再試一次！";
    } else {
        $message = "恭喜你，猜對了！";
    }
} else {
    $message = "請猜一個 1 到 100 的數字。";
}
?>

<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>猜數字遊戲</title>
</head>
<body>
    <h1>猜數字遊戲</h1>
    <p>猜一個 1 到 100 的數字：</p>
    
    <form method="POST">
        <input type="number" name="guess" min="1" max="100" required>
        <input type="submit" value="提交猜測">
    </form>

    <p><?php echo $message; ?></p>
</body>
</html>
