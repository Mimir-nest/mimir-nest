"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code } from 'lucide-react';
const codeSnippets = {
    javascript: [
        {
            language: 'javascript',
            code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
        },
        {
            language: 'javascript',
            code: `const binarySearch = (arr, target) => {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};`
        },
        {
            language: 'javascript',
            code: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const memoFib = (() => {
  const cache = {};
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    return cache[n] = fib(n-1) + fib(n-2);
  };
})();`
        },
        {
            language: 'javascript',
            code: `const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
};`
        },
        {
            language: 'javascript',
            code: `class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  append(value) {
    const node = { value, next: null };
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.size++;
  }
}`
        },
        {
            language: 'javascript',
            code: `const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};`
        },
        {
            language: 'javascript',
            code: `const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === "object") {
    const copy = {};
    Object.keys(obj).forEach(key => copy[key] = deepClone(obj[key]));
    return copy;
  }
};`
        },
        {
            language: 'javascript',
            code: `const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};`
        },
        {
            language: 'javascript',
            code: `const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
};`
        },
        {
            language: 'javascript',
            code: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}`
        },
        {
            language: 'javascript',
            code: `const isPalindrome = (str) => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
};`
        },
        {
            language: 'javascript',
            code: `const flattenArray = (arr) => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
};

const uniqueArray = (arr) => [...new Set(arr)];`
        },
        {
            language: 'javascript',
            code: `const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
};`
        },
        {
            language: 'javascript',
            code: `const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const curry = (fn) => (...args) => 
  args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));`
        }
    ],
    python: [
        {
            language: 'python',
            code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)`
        },
        {
            language: 'python',
            code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
        },
        {
            language: 'python',
            code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`
        },
        {
            language: 'python',
            code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head):
    prev = None
    current = head
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    return prev`
        },
        {
            language: 'python',
            code: `def fibonacci_memo():
    cache = {}
    def fib(n):
        if n in cache:
            return cache[n]
        if n <= 1:
            return n
        cache[n] = fib(n-1) + fib(n-2)
        return cache[n]
    return fib

fib = fibonacci_memo()`
        },
        {
            language: 'python',
            code: `class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        return self.items.pop() if self.items else None
    
    def peek(self):
        return self.items[-1] if self.items else None
    
    def is_empty(self):
        return len(self.items) == 0`
        },
        {
            language: 'python',
            code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    return result + left[i:] + right[j:]`
        },
        {
            language: 'python',
            code: `def is_palindrome(s):
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(cleaned) - 1
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False
        left += 1
        right -= 1
    return True`
        },
        {
            language: 'python',
            code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    result = []
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    inorder(root)
    return result`
        },
        {
            language: 'python',
            code: `from collections import deque

def bfs_graph(graph, start):
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        vertex = queue.popleft()
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            queue.extend(graph[vertex] - visited)
    
    return result`
        },
        {
            language: 'python',
            code: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`
        },
        {
            language: 'python',
            code: `def kadane_algorithm(arr):
    max_ending_here = max_so_far = arr[0]
    
    for i in range(1, len(arr)):
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)
    
    return max_so_far`
        },
        {
            language: 'python',
            code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

def three_sum(nums):
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
    return result`
        },
        {
            language: 'python',
            code: `class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = []
    
    def get(self, key):
        if key in self.cache:
            self.order.remove(key)
            self.order.append(key)
            return self.cache[key]
        return -1
    
    def put(self, key, value):
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            oldest = self.order.pop(0)
            del self.cache[oldest]
        
        self.cache[key] = value
        self.order.append(key)`
        }
    ],
    java: [
        {
            language: 'java',
            code: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`
        },
        {
            language: 'java',
            code: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`
        },
        {
            language: 'java',
            code: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`
        },
        {
            language: 'java',
            code: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class LinkedListOperations {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }
}`
        },
        {
            language: 'java',
            code: `import java.util.*;

public class GraphBFS {
    public List<Integer> bfsTraversal(Map<Integer, List<Integer>> graph, int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        
        queue.offer(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);
            
            for (int neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        return result;
    }
}`
        },
        {
            language: 'java',
            code: `public class Fibonacci {
    private Map<Integer, Long> memo = new HashMap<>();
    
    public long fibonacci(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        
        long result = fibonacci(n - 1) + fibonacci(n - 2);
        memo.put(n, result);
        return result;
    }
    
    public long fibonacciIterative(int n) {
        if (n <= 1) return n;
        long a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            long temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
}`
        },
        {
            language: 'java',
            code: `import java.util.*;

public class StackImplementation<T> {
    private List<T> items;
    
    public StackImplementation() {
        this.items = new ArrayList<>();
    }
    
    public void push(T item) {
        items.add(item);
    }
    
    public T pop() {
        if (isEmpty()) throw new EmptyStackException();
        return items.remove(items.size() - 1);
    }
    
    public T peek() {
        if (isEmpty()) throw new EmptyStackException();
        return items.get(items.size() - 1);
    }
    
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    public int size() {
        return items.size();
    }
}`
        },
        {
            language: 'java',
            code: `public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
        int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
        
        int i = 0, j = 0, k = left;
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
        }
        
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }
}`
        },
        {
            language: 'java',
            code: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class BinaryTreeTraversal {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderHelper(root, result);
        return result;
    }
    
    private void inorderHelper(TreeNode node, List<Integer> result) {
        if (node != null) {
            inorderHelper(node.left, result);
            result.add(node.val);
            inorderHelper(node.right, result);
        }
    }
}`
        },
        {
            language: 'java',
            code: `public class StringAlgorithms {
    public boolean isPalindrome(String s) {
        String cleaned = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        int left = 0, right = cleaned.length() - 1;
        while (left < right) {
            if (cleaned.charAt(left) != cleaned.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`
        },
        {
            language: 'java',
            code: `public class DynamicProgramming {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }
    
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        
        return maxSoFar;
    }
}`
        },
        {
            language: 'java',
            code: `import java.util.*;

public class LRUCache {
    private int capacity;
    private Map<Integer, Integer> cache;
    private LinkedList<Integer> order;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        this.order = new LinkedList<>();
    }
    
    public int get(int key) {
        if (cache.containsKey(key)) {
            order.remove((Integer) key);
            order.addLast(key);
            return cache.get(key);
        }
        return -1;
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            order.remove((Integer) key);
        } else if (cache.size() >= capacity) {
            int oldest = order.removeFirst();
            cache.remove(oldest);
        }
        
        cache.put(key, value);
        order.addLast(key);
    }
}`
        },
        {
            language: 'java',
            code: `public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        for (int i = n - 1; i > 0; i--) {
            swap(arr, 0, i);
            heapify(arr, i, 0);
        }
    }
    
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest != i) {
            swap(arr, i, largest);
            heapify(arr, n, largest);
        }
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`
        }
    ],
    cpp: [
        {
            language: 'cpp',
            code: `#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22};
    bubbleSort(arr);
    return 0;
}`
        },
        {
            language: 'cpp',
            code: `#include <vector>
#include <algorithm>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

std::vector<int> quickSort(std::vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int pivot = arr[arr.size() / 2];
    std::vector<int> left, middle, right;
    
    for (int x : arr) {
        if (x < pivot) left.push_back(x);
        else if (x == pivot) middle.push_back(x);
        else right.push_back(x);
    }
    
    std::vector<int> result = quickSort(left);
    result.insert(result.end(), middle.begin(), middle.end());
    std::vector<int> rightSorted = quickSort(right);
    result.insert(result.end(), rightSorted.begin(), rightSorted.end());
    return result;
}`
        },
        {
            language: 'cpp',
            code: `#include <memory>

struct ListNode {
    int val;
    std::shared_ptr<ListNode> next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class LinkedList {
public:
    std::shared_ptr<ListNode> reverseList(std::shared_ptr<ListNode> head) {
        std::shared_ptr<ListNode> prev = nullptr;
        std::shared_ptr<ListNode> current = head;
        
        while (current != nullptr) {
            std::shared_ptr<ListNode> nextTemp = current->next;
            current->next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }
};`
        },
        {
            language: 'cpp',
            code: `#include <unordered_map>

class Fibonacci {
private:
    std::unordered_map<int, long long> memo;
    
public:
    long long fib(int n) {
        if (n <= 1) return n;
        if (memo.find(n) != memo.end()) return memo[n];
        
        memo[n] = fib(n - 1) + fib(n - 2);
        return memo[n];
    }
    
    long long fibIterative(int n) {
        if (n <= 1) return n;
        long long a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            long long temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
};`
        },
        {
            language: 'cpp',
            code: `#include <stack>
#include <stdexcept>

template<typename T>
class Stack {
private:
    std::vector<T> items;
    
public:
    void push(const T& item) {
        items.push_back(item);
    }
    
    T pop() {
        if (isEmpty()) throw std::runtime_error("Stack is empty");
        T item = items.back();
        items.pop_back();
        return item;
    }
    
    T& top() {
        if (isEmpty()) throw std::runtime_error("Stack is empty");
        return items.back();
    }
    
    bool isEmpty() const {
        return items.empty();
    }
    
    size_t size() const {
        return items.size();
    }
};`
        },
        {
            language: 'cpp',
            code: `#include <vector>
#include <algorithm>

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> leftArr(arr.begin() + left, arr.begin() + mid + 1);
    std::vector<int> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
    
    int i = 0, j = 0, k = left;
    while (i < leftArr.size() && j < rightArr.size()) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    
    while (i < leftArr.size()) arr[k++] = leftArr[i++];
    while (j < rightArr.size()) arr[k++] = rightArr[j++];
}`
        },
        {
            language: 'cpp',
            code: `#include <queue>
#include <unordered_set>
#include <unordered_map>

std::vector<int> bfsTraversal(const std::unordered_map<int, std::vector<int>>& graph, int start) {
    std::vector<int> result;
    std::unordered_set<int> visited;
    std::queue<int> queue;
    
    queue.push(start);
    visited.insert(start);
    
    while (!queue.empty()) {
        int vertex = queue.front();
        queue.pop();
        result.push_back(vertex);
        
        auto it = graph.find(vertex);
        if (it != graph.end()) {
            for (int neighbor : it->second) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
    return result;
}`
        },
        {
            language: 'cpp',
            code: `#include <string>
#include <algorithm>
#include <cctype>

bool isPalindrome(const std::string& s) {
    std::string cleaned;
    for (char c : s) {
        if (std::isalnum(c)) {
            cleaned += std::tolower(c);
        }
    }
    
    int left = 0, right = cleaned.length() - 1;
    while (left < right) {
        if (cleaned[left] != cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`
        },
        {
            language: 'cpp',
            code: `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};

class BinaryTree {
public:
    std::vector<int> inorderTraversal(TreeNode* root) {
        std::vector<int> result;
        inorderHelper(root, result);
        return result;
    }
    
private:
    void inorderHelper(TreeNode* node, std::vector<int>& result) {
        if (node != nullptr) {
            inorderHelper(node->left, result);
            result.push_back(node->val);
            inorderHelper(node->right, result);
        }
    }
};`
        },
        {
            language: 'cpp',
            code: `#include <list>

class LRUCache {
private:
    int capacity;
    std::unordered_map<int, std::pair<int, std::list<int>::iterator>> cache;
    std::list<int> order;
    
public:
    LRUCache(int capacity) : capacity(capacity) {}
    
    int get(int key) {
        auto it = cache.find(key);
        if (it == cache.end()) return -1;
        
        order.erase(it->second.second);
        order.push_back(key);
        it->second.second = std::prev(order.end());
        
        return it->second.first;
    }
    
    void put(int key, int value) {
        auto it = cache.find(key);
        if (it != cache.end()) {
            order.erase(it->second.second);
            order.push_back(key);
            it->second = {value, std::prev(order.end())};
        } else {
            if (cache.size() >= capacity) {
                int oldest = order.front();
                order.pop_front();
                cache.erase(oldest);
            }
            order.push_back(key);
            cache[key] = {value, std::prev(order.end())};
        }
    }
};`
        },
        {
            language: 'cpp',
            code: `#include <climits>

int longestCommonSubsequence(const std::string& text1, const std::string& text2) {
    int m = text1.length(), n = text2.length();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

int maxSubArray(const std::vector<int>& nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];
    
    for (int i = 1; i < nums.size(); i++) {
        maxEndingHere = std::max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = std::max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}`
        },
        {
            language: 'cpp',
            code: `#include <algorithm>

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
        },
        {
            language: 'cpp',
            code: `#include <functional>

template<typename T>
class Graph {
private:
    std::unordered_map<T, std::vector<T>> adjList;
    
public:
    void addEdge(const T& u, const T& v) {
        adjList[u].push_back(v);
        adjList[v].push_back(u); // For undirected graph
    }
    
    void dfs(const T& start, std::function<void(const T&)> visit) {
        std::unordered_set<T> visited;
        dfsHelper(start, visited, visit);
    }
    
private:
    void dfsHelper(const T& vertex, std::unordered_set<T>& visited, 
                   std::function<void(const T&)>& visit) {
        visited.insert(vertex);
        visit(vertex);
        
        for (const T& neighbor : adjList[vertex]) {
            if (visited.find(neighbor) == visited.end()) {
                dfsHelper(neighbor, visited, visit);
            }
        }
    }
};`
        }
    ],
    typescript: [
        {
            language: 'typescript',
            code: `interface SortableArray<T> {
  data: T[];
  compare: (a: T, b: T) => number;
}

function bubbleSort<T>(sortable: SortableArray<T>): T[] {
  const arr = [...sortable.data];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sortable.compare(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
        },
        {
            language: 'typescript',
            code: `type SearchResult<T> = {
  index: number;
  found: boolean;
  item?: T;
};

function binarySearch<T>(
  arr: T[], 
  target: T, 
  compare: (a: T, b: T) => number
): SearchResult<T> {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = compare(arr[mid], target);
    
    if (comparison === 0) {
      return { index: mid, found: true, item: arr[mid] };
    }
    if (comparison < 0) left = mid + 1;
    else right = mid - 1;
  }
  
  return { index: -1, found: false };
}`
        },
        {
            language: 'typescript',
            code: `interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private size = 0;

  append(value: T): void {
    const newNode: ListNode<T> = { value, next: null };
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  reverse(): void {
    let prev: ListNode<T> | null = null;
    let current = this.head;
    
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}`
        },
        {
            language: 'typescript',
            code: `type MemoFunction<T extends any[], R> = (...args: T) => R;

function memoize<T extends any[], R>(fn: MemoFunction<T, R>): MemoFunction<T, R> {
  const cache = new Map<string, R>();
  
  return (...args: T): R => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});`
        },
        {
            language: 'typescript',
            code: `interface Stack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}

class ArrayStack<T> implements Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}`
        },
        {
            language: 'typescript',
            code: `function quickSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) return [...arr];
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => compare(x, pivot) < 0);
  const middle = arr.filter(x => compare(x, pivot) === 0);
  const right = arr.filter(x => compare(x, pivot) > 0);
  
  return [
    ...quickSort(left, compare),
    ...middle,
    ...quickSort(right, compare)
  ];
}

const numberCompare = (a: number, b: number): number => a - b;
const stringCompare = (a: string, b: string): number => a.localeCompare(b);`
        },
        {
            language: 'typescript',
            code: `type TreeNode<T> = {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
};

class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  
  constructor(private compare: (a: T, b: T) => number) {}

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) {
      return { value, left: null, right: null };
    }
    
    if (this.compare(value, node.value) < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (this.compare(value, node.value) > 0) {
      node.right = this.insertNode(node.right, value);
    }
    
    return node;
  }

  inorderTraversal(): T[] {
    const result: T[] = [];
    this.inorderHelper(this.root, result);
    return result;
  }

  private inorderHelper(node: TreeNode<T> | null, result: T[]): void {
    if (node) {
      this.inorderHelper(node.left, result);
      result.push(node.value);
      this.inorderHelper(node.right, result);
    }
  }
}`
        },
        {
            language: 'typescript',
            code: `type GraphNode<T> = {
  value: T;
  neighbors: GraphNode<T>[];
};

class Graph<T> {
  private nodes: Map<T, GraphNode<T>> = new Map();

  addNode(value: T): void {
    if (!this.nodes.has(value)) {
      this.nodes.set(value, { value, neighbors: [] });
    }
  }

  addEdge(from: T, to: T): void {
    this.addNode(from);
    this.addNode(to);
    
    const fromNode = this.nodes.get(from)!;
    const toNode = this.nodes.get(to)!;
    
    fromNode.neighbors.push(toNode);
  }

  bfs(start: T): T[] {
    const visited = new Set<T>();
    const queue: GraphNode<T>[] = [];
    const result: T[] = [];
    
    const startNode = this.nodes.get(start);
    if (!startNode) return result;
    
    queue.push(startNode);
    visited.add(start);
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);
      
      for (const neighbor of node.neighbors) {
        if (!visited.has(neighbor.value)) {
          visited.add(neighbor.value);
          queue.push(neighbor);
        }
      }
    }
    
    return result;
  }
}`
        },
        {
            language: 'typescript',
            code: `interface Cache<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  delete(key: K): boolean;
  clear(): void;
  size(): number;
}

class LRUCache<K, V> implements Cache<K, V> {
  private cache = new Map<K, V>();
  
  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)!;
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}`
        },
        {
            language: 'typescript',
            code: `type Predicate<T> = (item: T) => boolean;
type Mapper<T, U> = (item: T) => U;
type Reducer<T, U> = (acc: U, item: T) => U;

class FunctionalArray<T> {
  constructor(private items: T[]) {}

  map<U>(mapper: Mapper<T, U>): FunctionalArray<U> {
    return new FunctionalArray(this.items.map(mapper));
  }

  filter(predicate: Predicate<T>): FunctionalArray<T> {
    return new FunctionalArray(this.items.filter(predicate));
  }

  reduce<U>(reducer: Reducer<T, U>, initialValue: U): U {
    return this.items.reduce(reducer, initialValue);
  }

  find(predicate: Predicate<T>): T | undefined {
    return this.items.find(predicate);
  }

  some(predicate: Predicate<T>): boolean {
    return this.items.some(predicate);
  }

  every(predicate: Predicate<T>): boolean {
    return this.items.every(predicate);
  }

  toArray(): T[] {
    return [...this.items];
  }
}`
        },
        {
            language: 'typescript',
            code: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}

function maxSubarray(nums: number[]): number {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}`
        },
        {
            language: 'typescript',
            code: `type AsyncFunction<T, R> = (arg: T) => Promise<R>;

function debounce<T, R>(
  func: AsyncFunction<T, R>,
  wait: number
): AsyncFunction<T, R> {
  let timeout: NodeJS.Timeout | null = null;
  
  return async (arg: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      if (timeout) clearTimeout(timeout);
      
      timeout = setTimeout(async () => {
        try {
          const result = await func(arg);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, wait);
    });
  };
}

function throttle<T extends any[]>(
  func: (...args: T) => void,
  limit: number
): (...args: T) => void {
  let inThrottle = false;
  
  return (...args: T): void => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}`
        },
        {
            language: 'typescript',
            code: `interface Observer<T> {
  update(data: T): void;
}

interface Subject<T> {
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notify(data: T): void;
}

class Observable<T> implements Subject<T> {
  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

class DataStore<T> extends Observable<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
    this.notify(item);
  }

  getAll(): T[] {
    return [...this.data];
  }
}`
        }
    ]
};
const LanguageSelector = ({ currentLanguage, onLanguageChange, disabled }) => {
    const getRandomSnippet = (language) => {
        const snippets = codeSnippets[language] || [];
        const randomIndex = Math.floor(Math.random() * snippets.length);
        return snippets[randomIndex] || codeSnippets.javascript[0];
    };
    const handleLanguageSelect = (language) => {
        const snippet = getRandomSnippet(language);
        onLanguageChange(snippet);
    };
    return (<Select value={currentLanguage} onValueChange={handleLanguageSelect} disabled={disabled}>
      <SelectTrigger className="w-40 bg-dark-800 border-dark-600 text-white focus:ring-0 focus:ring-offset-0">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4"/>
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-dark-800 border-dark-600">
        <SelectItem value="javascript" className="text-white hover:bg-dark-700 focus:bg-dark-700">
          JavaScript
        </SelectItem>
        <SelectItem value="python" className="text-white hover:bg-dark-700 focus:bg-dark-700">
          Python
        </SelectItem>
        <SelectItem value="java" className="text-white hover:bg-dark-700 focus:bg-dark-700">
          Java
        </SelectItem>
        <SelectItem value="cpp" className="text-white hover:bg-dark-700 focus:bg-dark-700">
          C++
        </SelectItem>
        <SelectItem value="typescript" className="text-white hover:bg-dark-700 focus:bg-dark-700">
          TypeScript
        </SelectItem>
      </SelectContent>
    </Select>);
};
export default LanguageSelector;
export { codeSnippets };
